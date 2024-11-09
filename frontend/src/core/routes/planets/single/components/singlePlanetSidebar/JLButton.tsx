import { useAppSelector, useAppDispatch } from "@core/reducers";
import { planetMembershipsActions } from "@core/reducers/slices/planet_memberships";
import ApiService from "@core/utils/api";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { EntityId } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

interface JLButtonProps {
    id: EntityId;
    cooldownDuration?: number;
}

const JLButton: React.FC<JLButtonProps> = ({ id, cooldownDuration = 3000 }) => {
    const dispatch = useAppDispatch();
    const planetMembershipIds = useAppSelector(
        (state) => state.planet_memberships
    );
    const profile = useAppSelector((state) => state.profile.entity);
    const receivedPlanetMembership = Object.values(
        planetMembershipIds.entities
    ).find((entity) => entity.planet === id);

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
            const response = await ApiService.post("/planetmemberships/", {
                planet: id,
                user: profile?.id,
                user_role: 0,
            });
            if (response.status === 201) {
                dispatch(planetMembershipsActions.addOne(response.data));
            }
        } else {
            const response = await ApiService.delete(
                `/planetmemberships/${receivedPlanetMembership.id}/`
            );
            if (response.status === 204) {
                dispatch(
                    planetMembershipsActions.removeOne(
                        receivedPlanetMembership.id
                    )
                );
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

    if (
        receivedPlanetMembership?.user_role === 1 ||
        receivedPlanetMembership?.user_role === 2
    ) {
        return (
            <div className="relative w-full">
                <Link to={`/planets/${id}/settings`}>
                    <button
                        className={`w-full px-6 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-neutral-500 to-gray-600 hover:from-neutral-600 hover:to-gray-700`}
                    >
                        <span>
                            Settings
                            <FiSettings width={32} height={32} />
                        </span>
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <button
                onClick={handleClick}
                disabled={isCooldown}
                className={`w-full px-6 py-3 text-sm text-center font-bold text-white rounded-full bg-gradient-to-r 
                    ${
                        isCooldown
                            ? "bg-gray-500"
                            : "from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                    } 
                    focus:outline-none focus:ring-2 focus:ring-purple-400`}
            >
                {receivedPlanetMembership ? (
                    <span>
                        <MinusIcon width={32} height={32} />
                    </span>
                ) : (
                    <span>
                        <PlusIcon width={32} height={32} />
                    </span>
                )}
            </button>
            <div className="text-center">
                <Link
                    className="bg-gradient-to-t from-teal-400 to-cyan-400 bg-clip-text text-transparent hover:underline"
                    to="settings/"
                >
                    <span>
                        Settings
                    </span>
                </Link>
            </div>
            {isCooldown && (
                <div
                    className="absolute left-0 bottom-0 h-1 bg-purple-400"
                    style={{ width: `${cooldownProgress}%` }}
                ></div>
            )}
        </div>
    );
};

export default JLButton;
