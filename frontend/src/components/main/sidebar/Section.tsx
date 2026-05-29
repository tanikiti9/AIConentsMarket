'use client';
import { NavSection } from '@/components/interface';
import { useSearchStore } from '@/store/searchStore';

const Section = ({ icon, label, items }: NavSection) => {
  const addTag = useSearchStore((state) => state.addTag);
  const selectedTags = useSearchStore((state) => state.selectedTags);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        {icon} {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item, index) => {
          const selected = selectedTags.includes(item.name);
          return (
            <button
              key={index}
              onClick={() => addTag(item.name)}
              style={{
                border: selected
                  ? '2px solid black'
                  : '1px solid black',
                backgroundColor: selected
                  ? 'rgba(0, 0, 0, 0.7)'
                  : 'rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }}
            >
              {item.icon} {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Section;