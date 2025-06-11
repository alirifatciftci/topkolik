import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { fetchMatches } from '../../src/api/fetchMatches';

type Participant = {
  id: number;
  name: string;
  image_path: string;
  meta: { location: string };
};

type League = {
  name: string;
  image_path: string;
};

type Match = {
  id: number;
  name: string;
  starting_at: string;
  league: League;
  participants: Participant[];
};

export default function HomeScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getMatches = async () => {
      const data = await fetchMatches();
      setMatches(data);
      setLoading(false);
    };
    getMatches();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderMatch = ({ item }: { item: Match }) => {
    const home = item.participants?.find(p => p.meta?.location === 'home');
    const away = item.participants?.find(p => p.meta?.location === 'away');
    return (
      <View style={styles.matchItem}>
        <View style={styles.leagueRow}>
          {item.league?.image_path && (
            <Image source={{ uri: item.league.image_path }} style={styles.leagueLogo} />
          )}
          <ThemedText style={styles.leagueName}>{item.league?.name}</ThemedText>
        </View>
        <View style={styles.teamsRow}>
          {home && (
            <>
              <Image source={{ uri: home.image_path }} style={styles.teamLogo} />
              <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
                {home.name}
              </ThemedText>
            </>
          )}
          <ThemedText style={styles.vs}>vs</ThemedText>
          {away && (
            <>
              <ThemedText style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
                {away.name}
              </ThemedText>
              <Image source={{ uri: away.image_path }} style={styles.teamLogo} />
            </>
          )}
        </View>
        <ThemedText style={styles.date}>{item.starting_at}</ThemedText>
        {/* Maça tıklama alanı */}
        <View
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onTouchEnd={() => router.push({ pathname: '/MatchDetail', params: { match: JSON.stringify(item) } })}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText style={styles.header}>Canlı Maçlar</ThemedText>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatch}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', marginTop: 24 },
  matchItem: { padding: 16, borderRadius: 12, backgroundColor: '#f7f7fa', marginBottom: 16, elevation: 2 },
  leagueRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  leagueLogo: { width: 24, height: 24, marginRight: 8 },
  leagueName: { fontSize: 16, fontWeight: 'bold' },
  teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  teamLogo: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee' },
  teamName: { fontSize: 16, fontWeight: '600', marginHorizontal: 8 },
  vs: { fontSize: 16, fontWeight: 'bold', color: '#888' },
  date: { fontSize: 14, color: '#666', textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
