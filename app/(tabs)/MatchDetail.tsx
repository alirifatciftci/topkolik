import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function MatchDetail() {
  const params = useLocalSearchParams();
  const match = params.match ? JSON.parse(params.match as string) : null;

  if (!match) return <ThemedText>Maç bilgisi bulunamadı.</ThemedText>;

  const home = match.participants?.find((p: any) => p.meta?.location === 'home');
  const away = match.participants?.find((p: any) => p.meta?.location === 'away');

  // Skorları bul
  const homeScore = match.scores?.find((s: any) => s.score.participant === 'home')?.score.goals ?? '-';
  const awayScore = match.scores?.find((s: any) => s.score.participant === 'away')?.score.goals ?? '-';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leagueRow}>
        <Image source={{ uri: match.league.image_path }} style={styles.leagueLogo} />
        <ThemedText style={styles.leagueName}>{match.league.name}</ThemedText>
      </View>
      <View style={styles.teamsRow}>
        <Image source={{ uri: home.image_path }} style={styles.teamLogo} />
        <ThemedText style={styles.teamName}>{home.name}</ThemedText>
        <ThemedText style={styles.vs}>{homeScore} - {awayScore}</ThemedText>
        <ThemedText style={styles.teamName}>{away.name}</ThemedText>
        <Image source={{ uri: away.image_path }} style={styles.teamLogo} />
      </View>
      <ThemedText style={styles.date}>{match.starting_at}</ThemedText>
      {/* Gol atanlar */}
      {match.events && match.events.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <ThemedText style={{ fontWeight: 'bold' }}>Gol Atanlar:</ThemedText>
          {match.events
            .filter((e: any) => e.type === 'goal')
            .map((e: any, idx: number) => (
              <ThemedText key={idx}>
                {e.player_name} ({e.minute}′)
              </ThemedText>
            ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  leagueRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  leagueLogo: { width: 24, height: 24, marginRight: 8 },
  leagueName: { fontSize: 16, fontWeight: 'bold' },
  teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  teamLogo: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee' },
  teamName: { fontSize: 16, fontWeight: '600', marginHorizontal: 8, maxWidth: 100 },
  vs: { fontSize: 16, fontWeight: 'bold', color: '#888' },
  date: { fontSize: 14, color: '#666', textAlign: 'center' },
});