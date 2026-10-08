import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Database,
  Server,
  Layers,
  Shield,
  TestTube,
  Rocket,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Cpu,
  Code
} from 'lucide-react';
import { aiService, projectService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { Badge } from '../components/ui/Badge';

const BlueprintPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [blueprint, setBlueprint] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    modules: true,
    database: true,
    api: true,
    security: true,
  });

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    let isMounted = true;
    const fetchBlueprint = async () => {
      setLoading(true);
      try {
        const res = await aiService.getProjectBlueprint(id);
        if (isMounted && res.data.success) {
          setBlueprint(res.data.blueprint);
          setProjectTitle(res.data.project?.title || 'Engineering Software Project');
        }
      } catch (err) {
        toastError('Failed to generate blueprint. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchBlueprint();
    return () => { isMounted = false; };
  }, [id]);

  const copyBlueprintJSON = () => {
    if (!blueprint) return;
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopied(true);
    success('Project Blueprint JSON copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadBlueprintMarkdown = () => {
    if (!blueprint) return;
    const md = `# Project Blueprint: ${projectTitle}

## Overview
${blueprint.projectOverview}

## Problem Statement
${blueprint.problemStatement}

## Proposed Solution
${blueprint.proposedSolution}

## Core Objectives
${(blueprint.objectives || []).map(o => `- ${o}`).join('\n')}

## Main Modules
${(blueprint.mainModules || []).map(m => `### ${m.name}\n${m.description}`).join('\n\n')}

## Database Design
${JSON.stringify(blueprint.databaseDesign, null, 2)}

## API Design
${(blueprint.apiDesign || []).map(a => `- **${a.method}** \`${a.endpoint}\`: ${a.description}`).join('\n')}

## Security & Reliability
${(blueprint.securityRequirements || []).map(s => `- ${s}`).join('\n')}

## Testing Plan
${(blueprint.testingPlan || []).map(t => `- ${t}`).join('\n')}

## Deployment
${(blueprint.deploymentPlan || []).map(d => `- ${d}`).join('\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blueprint.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    success('Blueprint downloaded as Markdown!');
  };

  if (loading) {
    return (
      <div className="py-24">
        <Loader
          text="Generating Full Project Blueprint..."
          subtext="Architecting database schemas, API routes, security specifications, and deployment topology"
        />
      </div>
    );
  }

  if (!blueprint) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold">Blueprint Not Found</h2>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate(`/projects/${id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Details</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyBlueprintJSON}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied JSON' : 'Copy JSON'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={downloadBlueprintMarkdown}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Markdown
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/roadmap/${id}`)}
          >
            Open Roadmap
          </Button>
        </div>
      </div>

      {/* Blueprint Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
          <FileCode2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Principal Architect Specification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Technical Blueprint: {projectTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Production-grade system architecture, database entity relationships, API specifications, and deployment strategy.
        </p>
      </div>

      {/* 1. Project Overview & Problem Statement */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Executive Overview & Proposed Solution</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
              Problem Statement
            </h4>
            <p>{blueprint.problemStatement}</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
              Proposed Solution & Overview
            </h4>
            <p>{blueprint.proposedSolution || blueprint.projectOverview}</p>
          </div>
        </div>

        {blueprint.objectives && (
          <div className="pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Primary Engineering Objectives
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              {blueprint.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. Main System Modules */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Main Modules & Components</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(blueprint.mainModules || []).map((mod, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {mod.name}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Database Design & API Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Design */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Database Architecture</span>
          </h3>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Entity Definitions
            </h4>
            <div className="space-y-2">
              {(blueprint.databaseDesign?.entities || []).map((ent, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {ent.name}
                  </div>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {(ent.attributes || []).map((attr, aIdx) => (
                      <span key={aIdx} className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {blueprint.databaseDesign?.relationships && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Relationships
                </h4>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {blueprint.databaseDesign.relationships.map((rel, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-500">→</span>
                      <span>{rel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* API Design */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Server className="w-4 h-4 text-purple-500" />
            <span>REST API Specifications</span>
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {(blueprint.apiDesign || []).map((api, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs flex items-start gap-2.5"
              >
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-extrabold uppercase shrink-0 ${
                  api.method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                  api.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' :
                  api.method === 'PUT' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                  'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                }`}>
                  {api.method}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono font-bold text-slate-900 dark:text-slate-100 truncate">
                    {api.endpoint}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {api.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Security, Testing & Deployment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span>Security Requirements</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            {(blueprint.securityRequirements || []).map((sec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testing */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TestTube className="w-4 h-4 text-amber-500" />
            <span>Testing Plan</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            {(blueprint.testingPlan || []).map((test, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deployment */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-blue-500" />
            <span>Deployment Strategy</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            {(blueprint.deploymentPlan || []).map((dep, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{dep}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlueprintPage;
