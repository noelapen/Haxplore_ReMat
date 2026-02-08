import { useState } from 'react';
import { BookOpen, Leaf, Recycle, AlertCircle, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';

const educationalTopics = [
  {
    id: '1',
    icon: Recycle,
    title: 'Proper E-Waste Disposal',
    color: 'emerald',
    tips: [
      'Remove all personal data before recycling devices',
      'Separate batteries from electronic devices',
      'Never throw electronics in regular trash bins',
      'Look for certified e-waste recycling centers',
      'Donate working electronics instead of discarding',
    ],
  },
  {
    id: '2',
    icon: Leaf,
    title: 'Environmental Impact',
    color: 'green',
    stats: [
      { label: 'E-waste generated globally', value: '50M tons/year' },
      { label: 'Recycling rate', value: 'Only 20%' },
      { label: 'Toxic materials prevented', value: '85% reduction' },
      { label: 'CO₂ saved per ton recycled', value: '2.5 tons' },
    ],
  },
  {
    id: '3',
    icon: AlertCircle,
    title: 'Why E-Waste Matters',
    color: 'amber',
    points: [
      'Contains toxic materials like lead, mercury, and cadmium',
      'Can contaminate soil and water if improperly disposed',
      'Recoverable precious metals worth billions',
      'Growing fastest waste stream globally',
      'Proper recycling saves 95% of energy vs. mining new materials',
    ],
  },
  {
    id: '4',
    icon: TrendingDown,
    title: 'Reduce Your E-Waste',
    color: 'blue',
    actions: [
      'Buy quality electronics that last longer',
      'Repair instead of replace when possible',
      'Upgrade components rather than entire devices',
      'Sell or donate functional electronics',
      'Choose manufacturers with take-back programs',
    ],
  },
];

export function EducationalContent() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Educational Content</h3>
          <p className="text-sm text-gray-600">Learn about e-waste and environmental impact</p>
        </div>
      </div>

      <div className="space-y-3">
        {educationalTopics.map((topic) => {
          const Icon = topic.icon;
          const colors = getColorClasses(topic.color);
          const isExpanded = expandedTopic === topic.id;

          return (
            <div key={topic.id} className={`border-2 ${colors.border} rounded-xl overflow-hidden transition-all`}>
              <button
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                className={`w-full flex items-center justify-between p-4 ${colors.bg} hover:opacity-80 transition-opacity`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                  <span className={`font-bold ${colors.text}`}>{topic.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className={`w-5 h-5 ${colors.text}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 bg-white">
                  {'tips' in topic && (
                    <ul className="space-y-2">
                      {topic.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {'stats' in topic && (
                    <div className="grid grid-cols-2 gap-3">
                      {topic.stats.map((stat, idx) => (
                        <div key={idx} className="bg-green-50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-700">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {'points' in topic && (
                    <ul className="space-y-2">
                      {topic.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-amber-500 mt-0.5">⚠</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {'actions' in topic && (
                    <ul className="space-y-2">
                      {topic.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-0.5">→</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
