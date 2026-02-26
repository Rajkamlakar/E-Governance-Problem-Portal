import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        variant="outline-light" 
        id="language-dropdown"
        style={{ 
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Globe size={18} />
        <span>{currentLanguage.flag} {currentLanguage.name}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            active={i18n.language === lang.code}
          >
            {lang.flag} {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;