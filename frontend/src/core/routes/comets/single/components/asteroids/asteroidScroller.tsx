import { useAppDispatch, useAppSelector } from "@core/reducers";
import { asteroidsActions } from "@core/reducers/slices/asteroids";
import {
    AsteroidEntity,
    AsteroidFilters,
} from "@core/reducers/slices/asteroids/state";
import { loadAsteroids } from "@core/reducers/slices/asteroids/thunks/loadAsteroids";
import { LoadingStatus } from "@core/utils/const";
import { EntityId } from "@reduxjs/toolkit";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AsteroidCard from "./asteroidCard";
import { Form, Formik } from "formik";
import { FiArrowDown, FiArrowUp, FiFilter } from "react-icons/fi";
import Switchbu from "@core/components/switchbu";
import clsx from "clsx";
import { asteroidFilterSchema } from "./vd";

const AsteroidScroller: React.FC<{ comet_id: number }> = ({ comet_id }) => {
    const dispatch = useAppDispatch();
    const { beReady, filter, page, loadingStatus, ids, entities, maxPages } =
        useAppSelector((state) => state.asteroids);

    useEffect(() => {
        console.log("AsteroidScroller first use effect");
        
        dispatch(
            asteroidsActions.change_beReady({ new: true, comet: comet_id })
        );
    }, [comet_id, dispatch]);

    useEffect(() => {
        if (beReady) {
            console.log("AsteroidScroller ready");

            dispatch(loadAsteroids({ filter, page }));
        }
    }, [dispatch, beReady, filter, page]);

    const loadMoreAsteroids = () => {
        if (loadingStatus !== LoadingStatus.Loading) {
            dispatch(asteroidsActions.change_page(page + 1));
        }
    };

    return (
        <div className="mt-4">
            <hr className="border-neutral-800" />
            <div className="mt-4">
                <Formik
                    initialValues={
                        {
                            reply: null,
                            ordering: "",
                            comet: comet_id,
                        } as AsteroidFilters
                    }
                    validationSchema={asteroidFilterSchema}
                    onSubmit={() => {}}
                >
                    {({
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Switchbu
                                        field_name="ordering"
                                        states={[
                                            {
                                                tooltip: {
                                                    content: "Newest",
                                                    placement: "top",
                                                    children: <></>,
                                                },
                                                content: <FiArrowUp />,
                                                field_value: "",
                                            },
                                            {
                                                tooltip: {
                                                    content: "Oldest",
                                                    placement: "top",
                                                    children: <></>,
                                                },
                                                content: <FiArrowDown />,
                                                field_value: "-",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        id="reply"
                                        name="reply"
                                        placeholder="Reply ID"
                                        className={clsx(
                                            "block w-full rounded-lg border-none bg-neutral-800 py-2 px-3 text-sm text-neutral-100",
                                            touched.reply && errors.reply
                                                ? "border-red-500 ring-1 ring-red-500"
                                                : ""
                                        )}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.reply || ""}
                                        aria-label="Reply ID"
                                    />
                                    {touched.reply && errors.reply && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.reply}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    onClick={() => {
                                        const n_values = {
                                            ...values,
                                            reply:
                                                values.reply === ""
                                                    ? null
                                                    : values.reply,
                                        };

                                        dispatch(
                                            asteroidsActions.change_beReady({
                                                new: false,
                                                comet: comet_id,
                                            })
                                        );
                                        dispatch(
                                            asteroidsActions.change_filters(
                                                n_values
                                            )
                                        );
                                        dispatch(
                                            asteroidsActions.change_beReady({
                                                new: true,
                                                comet: comet_id,
                                            })
                                        );
                                    }}
                                    className="px-4 py-2 flex items-center space-x-2 text-white rounded-md bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                                >
                                    <FiFilter />
                                    <span>Apply</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <InfiniteScroll
                    dataLength={ids.length}
                    next={loadMoreAsteroids}
                    hasMore={
                        loadingStatus !== LoadingStatus.Loading &&
                        ids.length > 0 &&
                        page === maxPages
                    }
                    loader={<p>Loading asteroids...</p>}
                    endMessage={
                        <p className="text-3xl mt-4 font-bold tracking-tight text-cyan-300">
                            Congrats! You've reached the end.
                        </p>
                    }
                >
                    <div className="mt-4 space-y-4">
                        {ids.map((id: EntityId) => {
                            const asteroid = entities[id] as AsteroidEntity;
                            return (
                                <AsteroidCard
                                    key={id as string}
                                    asteroid={asteroid}
                                />
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default AsteroidScroller;
