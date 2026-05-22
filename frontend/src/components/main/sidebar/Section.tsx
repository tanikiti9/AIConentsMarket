'use client';
import { NavSection } from '@/components/interface'
import { useTagStore } from '@/store/tagStore'

const Section = (navSection: NavSection) => {
  const addTag = useTagStore((state) => state.addTag);
  const selectedTags = useTagStore((state) => state.selectedTags);

  return (
    <div>
      <h3 style={{ fontWeight: 'bold' }}>{navSection.icon}{navSection.label}</h3>
      <ul>
        {navSection.items.map((item, index) => (
          <li
            key={index}
            onClick={() => addTag(item.name)}
            style={{ fontWeight: selectedTags.includes(item.name) ? 'bold' : 'normal' }}
          >
            <button>a</button>{item.icon} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;