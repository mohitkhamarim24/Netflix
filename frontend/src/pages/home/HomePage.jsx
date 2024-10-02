import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
    const { user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return <div>Loading...</div>; // Optionally replace with a spinner component
    }

    return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;