import { View, Text } from 'react-native'
import { Theme } from '../../constants/Theme'

const getProjectStatus = (project) => {
  const validated = project['validated?'] ?? project.validated

  if (validated === true) {
    return 'Passed'
  }
  if (validated === false) {
    return 'Failed'
  }
  if (project.final_mark !== null && project.final_mark !== undefined) {
    return project.final_mark >= 50 ? 'Passed' : 'Failed'
  }

  return project.status || 'In progress'
}

const ProjectsSection = ({ projects = [] }) => {
  if (projects.length === 0) {
    return null
  }

  return (
    <View style={Theme.styles.projectsSection}>
      <Text style={Theme.styles.projectsTitle}>Projects</Text>
      {projects.map((project, index) => {
        const projectStatus = getProjectStatus(project)

        return (
          <View
            key={`${project.id || project.project?.id || 'project'}-${project.occurrence || index}`}
            style={Theme.styles.projectItem}
          >
            <Text style={Theme.styles.projectName}>
              {project.project?.name || 'Unnamed project'}
            </Text>
            <Text style={Theme.styles.projectInfo}>
              Mark: {project.final_mark ?? 'Not marked'}
            </Text>
            <Text
              style={[
                Theme.styles.projectStatus,
                projectStatus === 'Failed'
                  ? Theme.styles.projectStatusFailed
                  : projectStatus === 'Passed'
                    ? Theme.styles.projectStatusPassed
                    : Theme.styles.projectStatusPending,
              ]}
            >
              {projectStatus}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default ProjectsSection