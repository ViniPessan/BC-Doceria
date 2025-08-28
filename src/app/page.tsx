import { BirthdayCake } from "./components/birthdayCake/birthdayCake";
import { CupCake } from "./components/cupCake/cupCake";
import { HomeCake } from "./components/homeCake/homeCake";


export default function Home() {

  return (
    <div>
      <h1 className="text-7xl font-vibes text-transparent bg-gradient-to-r from-pink-300 to-pink-600 bg-clip-text drop-shadow-lg text-center pt-10">Bolos</h1>
      <CupCake/>
      <BirthdayCake/>
      <HomeCake/>
    </div>

  );
}
