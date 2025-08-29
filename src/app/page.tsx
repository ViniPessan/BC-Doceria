import { BirthdayCake } from "./components/birthdayCake/birthdayCake";
import { CupCake } from "./components/cupCake/cupCake";
import { HomeCake } from "./components/homeCake/homeCake";


export default function Home() {

  return (
    <div>
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text text-center pt-10 drop-shadow-[0_0_10px_#f4289157]">Bolos</h1>
      <CupCake/>
      <BirthdayCake/>
      <HomeCake/>
    </div>

  );
}
