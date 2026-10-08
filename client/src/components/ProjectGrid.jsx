import React from 'react';
import ProjectCard from './ProjectCard';
import EmptyState from './ui/EmptyState';
import Loader from './ui/Loader';

const ProjectGrid = ({
  projects = [],
  isLoading = false,
  savedProjectIds = [],
  onSaveToggle,
  comparedProjectIds = [],
  onCompareToggle,
  showCompare = true,
  emptyTitle = 'No projects found',
  emptyDescription = 'Try changing your search keywords or clearing active filters.',
  onEmptyAction,
  emptyActionLabel,
}) => {
  if (isLoading) {
    return (
      <div className="py-16">
        <Loader text="Discovering best matching projects..." subtext="Analyzing technical requirements, skill compatibility, and career alignment" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const id = String(project._id || project.id);
        const isSaved = savedProjectIds.some(sid => String(sid) === id);
        const isCompared = comparedProjectIds.some(cid => String(cid) === id);

        return (
          <ProjectCard
            key={id}
            project={project}
            isSaved={isSaved}
            onSaveToggle={onSaveToggle}
            isCompared={isCompared}
            onCompareToggle={onCompareToggle}
            showCompare={showCompare}
          />
        );
      })}
    </div>
  );
};

export default ProjectGrid;
