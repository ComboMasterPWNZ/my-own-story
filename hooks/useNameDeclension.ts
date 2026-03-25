import { inclineFirstname } from 'lvovich';

type Case = 'nominative' | 'genitive' | 'dative' | 'accusative' | 'instrumental' | 'prepositional';

export function useNameDeclension() {
  const declineName = (name: string, gender: 'male' | 'female', case_: Case): string => {
    try {
      // @ts-ignore - lvovich types might be missing or slightly different depending on version
      return inclineFirstname(name, case_, gender) || name;
    } catch (e) {
      console.warn('Failed to decline name:', name, e);
      return name;
    }
  };

  return { declineName };
}
