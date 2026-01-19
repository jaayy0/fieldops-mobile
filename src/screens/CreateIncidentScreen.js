import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { createIncident } from "../services/api";


export default function CreateIncidentScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgency, setUrgency] = useState("Media");

    const handleSubmit = async () => {
        try {
            await createIncident({ title, description, urgency });
            Alert.alert("OK", "Incidencia creada");
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };

    return (
        <View style={{ padding: 16 }}>
            <Text>Título</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ borderWidth: 1, marginBottom: 8 }}
            />

            <Text>Descripción</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={{ borderWidth: 1, marginBottom: 8 }}
            />

            <Text>Urgencia (Baja / Media / Alta)</Text>
            <TextInput
                value={urgency}
                onChangeText={setUrgency}
                style={{ borderWidth: 1, marginBottom: 16 }}
            />

            <Button title="Guardar" onPress={handleSubmit} />
        </View>
    );
}
