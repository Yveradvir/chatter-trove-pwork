import { useAppSelector, useAppDispatch } from "@core/reducers";
import { planetMembershipsActions } from "@core/reducers/slices/planet_memberships";
import ApiService from "@core/utils/api";
import { EntityId } from "@reduxjs/toolkit";
import React, { useState } from "react";

interface JLButtonProps {
    id: EntityId;
    cooldownDuration?: number;
}

const JLButton: React.FC<JLButtonProps> = ({ id, cooldownDuration = 3000 }) => {
    const dispatch = useAppDispatch();
    const planetMembershipIds = useAppSelector(state => state.planet_memberships);
    const profile = useAppSelector(state => state.profile.entity);
    const receivedPlanetMembership = Object.values(planetMembershipIds.entities).find(entity => entity.planet === id);

    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownProgress, setCooldownProgress] = useState(0);

    const handleClick = async () => {
        if (isCooldown) return;

        setIsCooldown(true);
        let progress = 0;

        const interval = setInterval(() => {
            progress += 100 / (cooldownDuration / 100);
            setCooldownProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);

        if (!receivedPlanetMembership) {
            const response = await ApiService.post("/planetmemberships/", { planet: id, user: profile?.id });
            if (response.status === 201) {
                dispatch(planetMembershipsActions.addOne(response.data)); 
            }
        } else {
            const response = await ApiService.delete(`/planetmemberships/${receivedPlanetMembership.id}/`);
            if (response.status === 204) {
                dispatch(planetMembershipsActions.removeOne(receivedPlanetMembership.id)); 
            }
        }

        setTimeout(() => {
            setIsCooldown(false);
            setCooldownProgress(0);
        }, cooldownDuration);
    };

    if (!profile) {
        return null; 
    }

    return (
        <div className="relative w-full">
            <button
                onClick={handleClick}
                disabled={isCooldown}
                className={`w-full px-6 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r 
                    ${isCooldown ? 'bg-gray-500' : 'from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700'} 
                    focus:outline-none focus:ring-2 focus:ring-purple-400`}
            >
                {receivedPlanetMembership ? "➖" : "➕"}
            </button>
            {isCooldown && (
                <div className="absolute left-0 bottom-0 h-1 bg-purple-400" style={{ width: `${cooldownProgress}%` }}></div>
            )}
        </div>
    );
};

export default JLButton;
