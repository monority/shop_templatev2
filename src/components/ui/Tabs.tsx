import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

export const Tabs = ({ tabs, defaultTab = 0 }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-slate-200 dark:border-slate-700 gap-1">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === idx
                ? 'text-brand dark:text-brand'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            role="tab"
            aria-selected={activeTab === idx}
            aria-controls={`panel-${idx}`}
          >
            {tab.label}
            {activeTab === idx && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab, idx) => (
          <motion.div
            key={idx}
            id={`panel-${idx}`}
            role="tabpanel"
            hidden={activeTab !== idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeTab === idx ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === idx && tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
