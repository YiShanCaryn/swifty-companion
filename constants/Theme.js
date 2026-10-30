import { StyleSheet } from 'react-native'
import { Colors } from './Colors'

export const Theme = {
  colors: Colors.light,
  styles: StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },
    title: {
      color: Colors.light.title,
      fontWeight: 'bold',
    },
    text: {
      color: Colors.light.text,
    },
    mutedText: {
      color: Colors.light.placeholder,
    },
    errorText: {
      color: Colors.error,
    },
    input: {
      backgroundColor: Colors.light.inputBackground,
      borderColor: Colors.light.border,
      color: Colors.light.title,
    },
    primaryButton: {
      backgroundColor: Colors.primary,
    },
    primaryButtonText: {
      color: Colors.light.navBackground,
      fontWeight: 'bold',
    },
    link: {
      color: Colors.primary,
      borderBottomColor: Colors.primary,
    },
    card: {
      backgroundColor: Colors.light.cardBackground,
      borderColor: Colors.light.border,
    },
    progressTrack: {
      backgroundColor: Colors.light.skillBackground,
    },
    progressFill: {
      backgroundColor: Colors.success,
    },
    homeContainer: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },
    homeContent: {
      flex: 1,
      width: '100%',
      maxWidth: 560,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 100,
      paddingBottom: 32,
    },
    homeErrorText: {
      color: Colors.error,
      fontSize: 14,
      marginBottom: 8,
      textAlign: 'center',
    },
    homeInputError: {
      borderColor: Colors.error,
    },
    homeLogo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    homeTitle: {
      color: Colors.light.title,
      fontWeight: 'bold',
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 12,
    },
    homeSubtitle: {
      fontSize: 18,
      marginBottom: 24,
    },
    searchContainer: {
      width: '100%',
      maxWidth: 400,
    },
    searchInput: {
      backgroundColor: Colors.light.inputBackground,
      borderColor: Colors.light.border,
      color: Colors.light.title,
      width: '100%',
      height: 48,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 12,
    },
    searchButton: {
      backgroundColor: Colors.primary,
      height: 48,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchButtonText: {
      color: Colors.light.navBackground,
      fontSize: 16,
      fontWeight: 'bold',
    },
    homeDescription: {
      color: Colors.light.placeholder,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 16,
    },
    homeLink: {
      color: Colors.primary,
      marginTop: 24,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary,
    },
    profileContainer: {
      width: '100%',
      maxWidth: 720,
      alignSelf: 'center',
      backgroundColor: Colors.light.background,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 32,
    },
    profileScrollView: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },
    profileTitle: {
      color: Colors.light.title,
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 12,
      textAlign: 'center',
    },
    profileDetails: {
      width: '100%',
      maxWidth: 560,
      alignItems: 'center',
      marginBottom: 24,
    },
    profileLogin: {
      color: Colors.light.text,
      fontSize: 18,
      marginBottom: 8,
      textAlign: 'center',
    },
    profileInfo: {
      color: Colors.light.text,
      fontSize: 16,
      marginVertical: 4,
      textAlign: 'center',
    },
    projectsSection: {
      width: '100%',
      maxWidth: 640,
      marginBottom: 24,
    },
    projectsTitle: {
      color: Colors.light.title,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    projectItem: {
      width: '100%',
      backgroundColor: Colors.light.cardBackground,
      borderColor: Colors.light.border,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 8,
      padding: 12,
    },
    projectName: {
      color: Colors.light.title,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    projectInfo: {
      color: Colors.light.text,
      fontSize: 14,
      marginBottom: 4,
    },
    projectStatus: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    projectStatusPassed: {
      color: Colors.success,
    },
    projectStatusFailed: {
      color: Colors.error,
    },
    projectStatusPending: {
      color: Colors.warning,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: Colors.light.border,
    },
    profileError: {
      color: Colors.error,
      textAlign: 'center',
    },
    skillsSection: {
      width: '100%',
      maxWidth: 640,
      alignItems: 'center',
      marginBottom: 24,
    },
    skillsTitle: {
      color: Colors.light.title,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    skillItem: {
      width: '100%',
      maxWidth: 560,
      alignItems: 'center',
      marginBottom: 12,
    },
    skillName: {
      color: Colors.light.title,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      textAlign: 'center',
    },
    skillBarContainer: {
      width: '100%',
      backgroundColor: Colors.light.skillBackground,
      borderRadius: 8,
      padding: 2,
      alignItems: 'center',
    },
    skillBar: {
      height: 16,
      backgroundColor: Colors.success,
      borderRadius: 6,
    },
    skillText: {
      color: Colors.light.placeholder,
      fontSize: 14,
      marginTop: 4,
      textAlign: 'center',
    },
  }),
}