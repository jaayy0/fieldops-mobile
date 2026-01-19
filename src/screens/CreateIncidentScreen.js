import { useState } from "react";
import { ActivityIndicator, Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createIncident } from "../services/api";


export default function CreateIncidentScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgency, setUrgency] = useState("Media");
    const [showUrgencyOptions, setShowUrgencyOptions] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await createIncident({ title, description, urgency });
            Alert.alert("OK", "Incidencia creada");
            navigation.navigate("IncidentList");
        } catch (e) {
            Alert.alert("Error", e.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 16 }}>Creando incidencia...</Text>
            </View>
        );
    }

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

            <Text style={{ marginBottom: 8 }}>Urgencia</Text>
            <TouchableOpacity
                onPress={() => setShowUrgencyOptions(!showUrgencyOptions)}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: showUrgencyOptions ? 0 : 16,
                }}
            >
                <Text>{urgency}</Text>
            </TouchableOpacity>
            {showUrgencyOptions && (
                <View
                    style={{
                        borderWidth: 1,
                        borderTopWidth: 0,
                        marginBottom: 16,
                    }}
                >
                    {["Baja", "Media", "Alta"].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                setUrgency(option);
                                setShowUrgencyOptions(false);
                            }}
                            style={{
                                padding: 10,
                                backgroundColor:
                                    urgency === option ? "#eee" : "white",
                            }}
                        >
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Button title="Guardar" onPress={handleSubmit} />
        </View>
    );
}
