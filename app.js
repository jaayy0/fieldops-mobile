import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateIncidentScreen from "./src/screens/CreateIncidentScreen";
import IncidentListScreen from "./src/screens/IncidentListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="IncidentList"
                    component={IncidentListScreen}
                    options={{ title: "Incidencias" }}
                />
                <Stack.Screen
                    name="CreateIncident"
                    component={CreateIncidentScreen}
                    options={{ title: "Nueva incidencia" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
