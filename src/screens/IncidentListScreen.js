import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";
import { getIncidents } from "../services/api";

export default function IncidentListScreen({ navigation }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadIncidents = async () => {
        setLoading(true);
        try {
            const data = await getIncidents();
            setIncidents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadIncidents();
        }, [])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 16 }}>Cargando incidencias...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, padding: 16 }}>
                {incidents.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            padding: 16,
                            marginBottom: 12,
                            backgroundColor: "#f5f5f5",
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#ddd"
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                            {item.title} {item.requires_supervisor && "🚨"}
                        </Text>
                        <Text style={{ marginBottom: 4 }}>{item.description}</Text>
                        <Text>Urgencia: {item.urgency}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{ padding: 16, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#ddd" }}>
                <Button
                    title="Nueva Incidencia"
                    onPress={() => navigation.navigate("CreateIncident")}
                />
            </View>
        </View>
    );
}
