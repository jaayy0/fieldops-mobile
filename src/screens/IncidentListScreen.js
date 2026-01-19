import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getIncidents } from "../services/api";

export default function IncidentListScreen() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadIncidents = async () => {
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
        return <Text style={{ padding: 16 }}>Cargando incidencias...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {incidents.map((item) => (
                <View key={item.id} style={styles.card}>
                    <Text style={styles.title}>
                        {item.title} {item.requires_supervisor && "🚨"}
                    </Text>
                    <Text>{item.description}</Text>
                    <Text>Urgencia: {item.urgency}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
