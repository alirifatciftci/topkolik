import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

// Buraya kendi JSON verini yapıştır
const matches = [
  {
    "id": 19172085,
    "name": "Antalyaspor vs Galatasaray",
    "starting_at": "2024-10-19 16:00:00",
    "participants": [
      {
        "name": "Antalyaspor",
        "image_path": "https://cdn.sportmonks.com/images/soccer/teams/17/81.png",
        "meta": { "location": "home" }
      },
      {
        "name": "Galatasaray",
        "image_path": "https://cdn.sportmonks.com/images/soccer/teams/2/34.png",
        "meta": { "location": "away" }
      }
    ],
    "scores": [
      { "score": { "goals": 0 }, "description": "CURRENT", "participant_id": 81 },
      { "score": { "goals": 0 }, "description": "CURRENT", "participant_id": 34 }
    ]
  },
  // ... diğer maçlar (JSON'un tamamını buraya ekleyebilirsin)
];

const getScore = (scores, participants, location) => {
  const participant = participants.find(p => p.meta.location === location);
  const scoreObj = scores.find(s => participant && s.participant_id === participant.id && s.description === "CURRENT");
  return scoreObj ? scoreObj.score.goals : '-';
};

const MatchesMockComponent = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Canlı Maçlar</Text>
    <FlatList
      data={matches}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.matchItem}>
          <View style={styles.teamsRow}>
            <Image source={{ uri: item.participants[0].image_path }} style={styles.logo} />
            <Text style={styles.teamName}>{item.participants[0].name}</Text>
            <Text style={styles.score}>
              {getScore(item.scores, item.participants, "home")} : {getScore(item.scores, item.participants, "away")}
            </Text>
            <Text style={styles.teamName}>{item.participants[1].name}</Text>
            <Image source={{ uri: item.participants[1].image_path }} style={styles.logo} />
          </View>
          <Text style={styles.date}>{item.starting_at}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  matchItem: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamName: { fontSize: 16, fontWeight: '600', marginHorizontal: 8 },
  score: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 8 },
  logo: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#eee' },
  date: { fontSize: 12, color: '#888', marginTop: 4, textAlign: 'center' }
});

export default MatchesMockComponent;