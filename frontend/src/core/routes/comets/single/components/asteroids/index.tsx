import AsteroidScroller from "./asteroidScroller";
import NewAsteroid from "./newAsteroid";

const AsteroidsScroller: React.FC<{ comet_id: number }> = ({ comet_id }) => {
    return (
        <div>
            <NewAsteroid comet_id={comet_id} />
            <AsteroidScroller comet_id={comet_id}/>
        </div>
    );
}

export default AsteroidsScroller;