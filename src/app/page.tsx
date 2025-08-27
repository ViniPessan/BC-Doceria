import { BirthdayCake } from "./components/birthdayCake/birthdayCake";
import { CupCake } from "./components/cupCake/cupCake";
import { HomeCake } from "./components/homeCake/homeCake";


export default function Home() {

  return (
    <div>
      <CupCake/>
      <BirthdayCake/>
      <HomeCake/>
    </div>

  );
}
