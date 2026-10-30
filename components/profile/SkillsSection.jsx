import { View, Text } from 'react-native'
import { Theme } from '../../constants/Theme'

const SkillsSection = ({ skills = [] }) => {
  if (skills.length === 0) {
    return null
  }

  return (
    <View style={Theme.styles.skillsSection}>
      <Text style={Theme.styles.skillsTitle}>Skills</Text>
      {skills.map((skill, index) => (
        <View key={`${skill.name}-${index}`} style={Theme.styles.skillItem}>
          <Text style={Theme.styles.skillName}>{skill.name}</Text>
          <View style={Theme.styles.skillBarContainer}>
            <View style={[Theme.styles.skillBar, { width: `${skill.percentage || 0}%` }]} />
            <Text style={Theme.styles.skillText}>
              Level {skill.level} - {skill.percentage || 0}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default SkillsSection