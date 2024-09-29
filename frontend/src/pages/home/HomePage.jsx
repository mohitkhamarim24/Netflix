import HomeScreen from "./HomeScreen";
import AuthScreen from "./authScreen";
const HomePage = () => {
  const user = false;
  return (
<div>
  {user ? <HomeScreen/> : <AuthScreen/>}
</div>
  )
}

export default HomePage
