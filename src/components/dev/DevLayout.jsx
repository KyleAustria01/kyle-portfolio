import { useState, useEffect } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { Files, Search, GitBranch, Play, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { getFileIcon } from './DevIcons';
import DevHero from './DevHero';
import DevAbout from './DevAbout';
import DevExperience from './DevExperience';
import DevSkills from './DevSkills';
import DevProjects from './DevProjects';
import DevContact from './DevContact';
import DevCopilotChat from './DevCopilotChat';
import ScrollToTop from '../ScrollToTop';

const tabs = [
  { id: 'hero', label: 'README.md' },
  { id: 'about', label: 'about.ts' },
  { id: 'experience', label: 'experience.log' },
  { id: 'skills', label: 'package.json' },
  { id: 'projects', label: 'projects/' },
  { id: 'contact', label: 'contact.sh' },
];

const explorerFiles = [
  { name: 'src', isFolder: true, indent: 0, open: true },
  { name: 'README.md', indent: 1, section: 'hero' },
  { name: 'about.ts', indent: 1, section: 'about' },
  { name: 'experience.log', indent: 1, section: 'experience' },
  { name: 'package.json', indent: 1, section: 'skills' },
  { name: 'projects/', indent: 1, section: 'projects', isFolder: true, open: true },
  { name: 'contact.sh', indent: 1, section: 'contact' },
  { name: '.gitignore', indent: 0, disabled: true },
  { name: 'tsconfig.json', indent: 0, disabled: true },
];

export default function DevLayout() {
  const { toggleViewMode } = useViewMode();
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map(t => t.id);
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const closeTab = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="vsc-shell">
      {/* ── VS Code Title Bar ── */}
      <div className="vsc-titlebar">
        <div className="vsc-titlebar-left">
          <span className="vsc-menu-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3h12v1H2V3zm0 4h12v1H2V7zm0 4h12v1H2v-1z"/>
            </svg>
          </span>
          <span className="vsc-titlebar-menus">
            <span>File</span><span>Edit</span><span>View</span><span>Terminal</span><span>Help</span>
          </span>
        </div>
        <div className="vsc-titlebar-center">
          kyle-portfolio — Visual Studio Code
        </div>
        <div className="vsc-titlebar-right">
          <button className="vsc-clean-switch" onClick={toggleViewMode}>
            ✨ Clean Mode
          </button>
          <span className="vsc-window-controls">
            <span className="vsc-wc">─</span>
            <span className="vsc-wc">□</span>
            <span className="vsc-wc close">✕</span>
          </span>
        </div>
      </div>

      <div className="vsc-main">
        {/* ── Activity Bar ── */}
        <div className="vsc-activitybar">
          <button
            className={`vsc-activity-icon${sidebarOpen ? ' active' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Explorer"
          >
            <Files size={22} />
          </button>
          <button className="vsc-activity-icon" title="Search">
            <Search size={22} />
          </button>
          <button className="vsc-activity-icon" title="Source Control">
            <GitBranch size={22} />
          </button>
          <button className="vsc-activity-icon" title="Run & Debug">
            <Play size={22} />
          </button>
          <div className="vsc-activity-spacer" />
          <button className="vsc-activity-icon" title="Settings">
            <Settings size={22} />
          </button>
        </div>

        {/* ── Sidebar / Explorer ── */}
        {sidebarOpen && (
          <div className="vsc-sidebar">
            <div className="vsc-sidebar-header">EXPLORER</div>
            <div className="vsc-sidebar-section">
              <div className="vsc-sidebar-section-title">
                <ChevronDown size={14} />
                <span>KYLE-PORTFOLIO</span>
              </div>
              {explorerFiles.map((file, i) => {
                const icon = file.isFolder ? null : getFileIcon(file.name);
                return (
                  <div
                    key={i}
                    className={`vsc-explorer-file${activeTab === file.section ? ' active' : ''}${file.disabled ? ' disabled' : ''}`}
                    style={{ paddingLeft: `${12 + file.indent * 16}px` }}
                    onClick={() => file.section && scrollTo(file.section)}
                  >
                    {file.isFolder ? (
                      <>
                        <ChevronDown size={12} className="vsc-folder-chevron" />
                        <span className="vsc-file-icon folder">📁</span>
                      </>
                    ) : (
                      <span className="vsc-file-icon" style={{ color: icon?.color }}>{icon?.letter}</span>
                    )}
                    <span className="vsc-file-name">{file.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Editor Area ── */}
        <div className="vsc-editor-area">
          {/* Tab bar */}
          <div className="vsc-tabbar">
            {tabs.map(tab => {
              const icon = getFileIcon(tab.label);
              return (
                <button
                  key={tab.id}
                  className={`vsc-tab${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => scrollTo(tab.id)}
                >
                  <span className="vsc-tab-icon" style={{ color: icon.color }}>{icon.letter}</span>
                  <span className="vsc-tab-label">{tab.label}</span>
                  <span className="vsc-tab-close" onClick={(e) => closeTab(e)}>✕</span>
                </button>
              );
            })}
          </div>

          {/* Breadcrumbs */}
          <div className="vsc-breadcrumbs">
            <span>kyle-portfolio</span>
            <ChevronRight size={12} />
            <span>src</span>
            <ChevronRight size={12} />
            <span className="vsc-breadcrumb-active">
              {tabs.find(t => t.id === activeTab)?.label || 'README.md'}
            </span>
          </div>

          {/* Editor Content */}
          <div className="vsc-editor-content">
            <DevHero />
            <DevAbout />
            <DevExperience />
            <DevSkills />
            <DevProjects />
            <DevContact />
          </div>
        </div>

        {/* ── Minimap ── */}
        <div className="vsc-minimap">
          <div className="vsc-minimap-blocks">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="vsc-minimap-line" style={{
                width: `${20 + Math.random() * 60}%`,
                opacity: 0.15 + Math.random() * 0.25,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className="vsc-statusbar">
        <div className="vsc-statusbar-left">
          <span className="vsc-status-item vsc-status-remote">
            &gt;&lt; WSL
          </span>
          <span className="vsc-status-item">
            <GitBranch size={12} /> main
          </span>
          <span className="vsc-status-item vsc-status-ok">
            ✓ 0
          </span>
          <span className="vsc-status-item">
            ⚠ 0
          </span>
        </div>
        <div className="vsc-statusbar-right">
          <span className="vsc-status-item">Ln 1, Col 1</span>
          <span className="vsc-status-item">Spaces: 2</span>
          <span className="vsc-status-item">UTF-8</span>
          <span className="vsc-status-item">TypeScript React</span>
          <span className="vsc-status-item vsc-status-copilot">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L13.09 7.26L18 6L14.74 9.74L20 12L14.74 14.26L18 18L13.09 16.74L12 22L10.91 16.74L6 18L9.26 14.26L4 12L9.26 9.74L6 6L10.91 7.26L12 2Z"/></svg>
            Copilot
          </span>
          <span className="vsc-status-item">{time}</span>
        </div>
      </div>

      <ScrollToTop />
      <DevCopilotChat />
    </div>
  );
}
