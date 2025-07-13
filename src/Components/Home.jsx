import StartFree from './HomeComponents/StartFree'
import Slide from './HomeComponents/Slide'
import HomePage from './HomeComponents/UseCrousal'

const Home = () => {
    return (
        <div>
          
            <StartFree />
            <div className="overflow-hidden">
                <div className=" sm:mb-20 mb-0">
                    {/* cards here */}
                    <HomePage />
                </div>
            </div>


        </div>
    )
}

export default Home
