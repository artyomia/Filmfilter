import { getProjects } from '@/lib/data';
import { ProjectForm } from './project-form';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-2 text-sm text-slate-300">
          Manage website profiles, tone settings, and WordPress credentials (admin only).
        </p>
        <div className="mt-6">
          <ProjectForm />
        </div>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold">Existing projects</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {projects.length === 0 && <p>No projects created yet.</p>}
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{project.name}</p>
                <p className="text-xs text-slate-500">{project.website_url}</p>
              </div>
              <span className="badge border-slate-700 text-slate-300">{project.industry}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
