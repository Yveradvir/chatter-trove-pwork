import { asteroidsActions } from "@core/reducers/slices/comets copy";
import NewAsteroid from "./newAsteroid";
import { useAppDispatch } from "@core/reducers";

const AsteroidsScroller: React.FC<{ comet_id: number }> = ({ comet_id }) => {
    const d = useAppDispatch()
    return (
        <div>
            <NewAsteroid comet_id={comet_id} />
            <button onClick={() => {d(asteroidsActions.reply(1))}}>1</button>
            <button onClick={() => {d(asteroidsActions.reply(2))}}>2</button>
            <button onClick={() => {d(asteroidsActions.reply(3))}}>erase</button>
        </div>
    );
}

export default AsteroidsScroller;