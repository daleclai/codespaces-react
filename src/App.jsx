import { useEffect, useState } from 'react';
import './App.css';

const dogs = [
  {
    slug: 'sunny',
    name: 'Sunny',
    breed: 'Golden retriever',
    note: 'Professional tennis-ball enthusiast',
    group: 'Big softies',
    image: 'photo-1552053831-71594a27632d',
    alt: 'Golden retriever looking into the camera',
    age: '4 years',
    gender: 'Female',
    personality: 'A sunny-side-up social butterfly who greets every new friend like they have been expected all day.',
    medications: 'Routine flea and tick prevention; no other medication history shared.',
    snacks: 'Carrot coins and blueberries',
  },
  {
    slug: 'pip',
    name: 'Pip',
    breed: 'Corgi',
    note: 'Small legs, enormous plans',
    group: 'Little legends',
    image: 'photo-1517849845537-4d257902454a',
    alt: 'Small dog with a bright, curious expression',
    age: '3 years',
    gender: 'Male',
    personality: 'Fearless, quick-witted, and convinced that every sofa was built at exactly the right height.',
    medications: 'No medication history shared.',
    snacks: 'Apple slices and small pieces of plain chicken',
  },
  {
    slug: 'marlow',
    name: 'Marlow',
    breed: 'Labrador mix',
    note: 'Will follow you absolutely anywhere',
    group: 'Outdoors',
    image: 'photo-1548199973-03cce0bbc87b',
    alt: 'Dogs running together across a grassy field',
    age: '5 years',
    gender: 'Female',
    personality: 'A gentle adventure buddy who is happiest with muddy paws and the whole family nearby.',
    medications: 'Seasonal allergy medication reported; details not specified.',
    snacks: 'Blueberries and plain pumpkin bites',
  },
  {
    slug: 'olive',
    name: 'Olive',
    breed: 'French bulldog',
    note: 'Neighborhood nap champion',
    group: 'Little legends',
    image: 'photo-1543466835-00a7907e9de1',
    alt: 'A dog with a dark coat and alert ears',
    age: '2 years',
    gender: 'Female',
    personality: 'A tiny comedian with impeccable nap timing and a soft spot for sunny windowsills.',
    medications: 'A past short course of medication after a stomach upset; no current medication reported.',
    snacks: 'Cucumber slices and crunchy carrots',
  },
  {
    slug: 'scout',
    name: 'Scout',
    breed: 'Border collie',
    note: 'Has never met a trail they did not like',
    group: 'Outdoors',
    image: 'photo-1551717743-49959800b1f6',
    alt: 'Happy dog enjoying time outside',
    age: '6 years',
    gender: 'Male',
    personality: 'Bright, focused, and always ready to turn a familiar walk into a new expedition.',
    medications: 'Routine parasite prevention; no other medication history shared.',
    snacks: 'Freeze-dried beef and apple slices',
  },
  {
    slug: 'biscuit',
    name: 'Biscuit',
    breed: 'Golden retriever',
    note: 'A very good reason to take the long way',
    group: 'Big softies',
    image: 'photo-1525253086316-d0c936c814f8',
    alt: 'Golden dog sitting outdoors in soft light',
    age: '7 years',
    gender: 'Male',
    personality: 'A patient old soul who specializes in comforting company and very enthusiastic tail wags.',
    medications: 'No medication history shared.',
    snacks: 'Plain pumpkin and blueberries',
  },
  {
    slug: 'clover',
    name: 'Clover',
    breed: 'Terrier mix',
    note: 'Chief window-seat inspector',
    group: 'Little legends',
    image: 'photo-1537151608828-ea2b11777ee8',
    alt: 'Playful little dog looking toward the camera',
    age: '1 year',
    gender: 'Female',
    personality: 'Curious about everything, especially parcels, rustling leaves, and people holding snacks.',
    medications: 'Past ear drops after a veterinary visit; no current medication reported.',
    snacks: 'Carrot sticks and small pieces of plain chicken',
  },
  {
    slug: 'otis',
    name: 'Otis',
    breed: 'Shepherd mix',
    note: 'Brings the best energy to every picnic',
    group: 'Outdoors',
    image: 'photo-1516734212186-a967f81ad0d7',
    alt: 'Brown dog relaxing outside',
    age: '8 years',
    gender: 'Male',
    personality: 'A steady, affectionate companion who thinks every picnic needs one more friend.',
    medications: 'Joint-support medication reported; product and details not specified.',
    snacks: 'Cucumber, carrots, and plain pumpkin',
  },
];

const filters = ['All dogs', 'Big softies', 'Little legends', 'Outdoors'];

function getDogSlugFromHash() {
  return window.location.hash.match(/^#dog\/([a-z0-9-]+)$/)?.[1] || '';
}

function createEmptyDogDraft() {
  return {
    name: '',
    breed: '',
    age: '',
    gender: '',
    group: 'Big softies',
    personality: '',
    medications: '',
    snacks: '',
    photo: '',
  };
}

function DogParade() {
  const dogsInParade = [
    { color: '#cf7954', delay: '0s' },
    { color: '#71957c', delay: '-6.5s' },
    { color: '#6f8fab', delay: '-13s' },
  ];

  return (
    <div className="dog-parade" aria-hidden="true">
      {dogsInParade.map((dog, index) => (
        <span
          className="parade-dog"
          key={dog.color}
          style={{ '--dog-color': dog.color, '--dog-delay': dog.delay, '--dog-index': index }}
        >
          <svg className="cartoon-dog" viewBox="0 0 96 54" xmlns="http://www.w3.org/2000/svg">
            <path className="dog-tail" d="M25 25C12 24 11 15 15 10" fill="none" stroke="var(--dog-color)" strokeLinecap="round" strokeWidth="5" />
            <ellipse cx="44" cy="31" rx="23" ry="12" fill="var(--dog-color)" />
            <path d="M32 36c7 5 17 6 25 1" fill="none" stroke="#fff" strokeLinecap="round" strokeOpacity=".8" strokeWidth="3" />
            <circle cx="68" cy="23" r="11" fill="var(--dog-color)" />
            <path d="M63 16c-7-10-12-5-9 4m19-4c7-9 12-4 8 4" fill="var(--dog-color)" />
            <ellipse cx="77" cy="28" rx="8" ry="5.5" fill="#f2c8a9" />
            <circle cx="80" cy="27" r="1.7" fill="#203a32" />
            <circle cx="66" cy="22" r="1.4" fill="#203a32" />
            <path d="M58 31h9" stroke="#e46b4f" strokeLinecap="round" strokeWidth="3" />
            <g className="dog-legs dog-legs-back" fill="none" stroke="var(--dog-color)" strokeLinecap="round" strokeWidth="5">
              <path d="M31 38l-3 9m11-8 2 8" />
            </g>
            <g className="dog-legs dog-legs-front" fill="none" stroke="var(--dog-color)" strokeLinecap="round" strokeWidth="5">
              <path d="M53 38l-2 9m11-10 3 9" />
            </g>
          </svg>
        </span>
      ))}
    </div>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All dogs');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [dogList, setDogList] = useState(dogs);
  const [locationHash, setLocationHash] = useState(window.location.hash);
  const [dogDraft, setDogDraft] = useState(createEmptyDogDraft);
  const selectedDogSlug = getDogSlugFromHash();
  const selectedDog = dogList.find((dog) => dog.slug === selectedDogSlug);
  const isAddingDog = locationHash === '#add';
  const visibleDogs = activeFilter === 'All dogs'
    ? dogList
    : dogList.filter((dog) => dog.group === activeFilter);

  useEffect(() => {
    const handleHashChange = () => setLocationHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeBackgroundColor = () => {
    const hue = Math.floor(Math.random() * 360);
    setBackgroundColor(`hsl(${hue} 38% 91%)`);
  };

  const updateDogDraft = (event) => {
    const { name, value } = event.target;
    setDogDraft((currentDraft) => ({ ...currentDraft, [name]: value }));
  };

  const updateDogPhoto = (event) => {
    const photoFile = event.target.files?.[0];
    if (!photoFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDogDraft((currentDraft) => ({ ...currentDraft, photo: reader.result }));
    };
    reader.readAsDataURL(photoFile);
  };

  const addDog = (event) => {
    event.preventDefault();
    const name = dogDraft.name.trim();
    const slugName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'good-dog';
    let slug = slugName;
    let duplicateSuffix = 1;
    while (dogList.some((dog) => dog.slug === slug)) {
      slug = `${slugName}-${duplicateSuffix}`;
      duplicateSuffix += 1;
    }
    const newDog = {
      ...dogDraft,
      slug,
      name,
      breed: dogDraft.breed.trim(),
      note: dogDraft.personality.trim(),
      alt: `${name}, a ${dogDraft.breed.trim()}`,
    };

    setDogList((currentDogs) => [newDog, ...currentDogs]);
    setActiveFilter('All dogs');
    setDogDraft(createEmptyDogDraft());
    window.location.hash = `dog/${slug}`;
  };

  return (
    <div
      className="App"
      style={backgroundColor ? { '--page-background': backgroundColor } : undefined}
    >
      <DogParade />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Good Dog Club home">
          <span className="wordmark-mark" aria-hidden="true">G</span>
          GOOD DOG CLUB
        </a>
        <span className="header-note">A little corner of the internet for good dogs.</span>
        <span className="header-count"><span aria-hidden="true">●</span> DOGS ON DISPLAY: {String(dogList.length).padStart(2, '0')}</span>
        <a className="add-dog-button" href="#add" aria-label="Add a dog">
          <span aria-hidden="true">+</span>
          <span className="add-dog-label">Add a dog</span>
        </a>
        <button
          className="background-button"
          type="button"
          aria-label="Change background color to a random color"
          onClick={changeBackgroundColor}
        >
          <span className="color-swatch" aria-hidden="true" />
          Random color
        </button>
      </header>

      <main id="top">
        {selectedDog ? (
          <section className="dog-profile" aria-labelledby="profile-title">
            <a className="back-link" href="#top"><span aria-hidden="true">←</span> All dogs</a>
            <div className="profile-layout">
              <div className="profile-photo-wrap">
                <img
                  src={selectedDog.photo || `https://images.unsplash.com/${selectedDog.image}?auto=format&fit=crop&w=1200&q=85`}
                  alt={selectedDog.alt}
                />
                <span className="photo-number">NO. {String(dogList.indexOf(selectedDog) + 1).padStart(2, '0')}</span>
              </div>
              <div className="profile-copy">
                <p className="eyebrow">{selectedDog.group} · {selectedDog.breed}</p>
                <h1 id="profile-title">Meet <span>{selectedDog.name}.</span></h1>
                <p className="profile-section-label">Personality</p>
                <p className="profile-personality">{selectedDog.personality}</p>
                <dl className="profile-facts">
                  <div><dt>Age</dt><dd>{selectedDog.age}</dd></div>
                  <div><dt>Gender</dt><dd>{selectedDog.gender}</dd></div>
                  <div><dt>Medication history</dt><dd>{selectedDog.medications}</dd></div>
                  <div><dt>Favorite snacks</dt><dd>{selectedDog.snacks}</dd></div>
                </dl>
                <p className="profile-disclaimer">These are fictional profile details, not veterinary records.</p>
              </div>
            </div>
          </section>
        ) : isAddingDog ? (
          <section className="add-dog-page" aria-labelledby="add-dog-title">
            <a className="back-link" href="#top"><span aria-hidden="true">←</span> All dogs</a>
            <div className="add-dog-heading">
              <p className="eyebrow">Good dogs welcome</p>
              <h1 id="add-dog-title">Introduce <span>your dog.</span></h1>
              <p>A little profile for a very good friend.</p>
            </div>
            <form className="dog-form" onSubmit={addDog}>
              <div className="form-fields">
                <label className="form-field">
                  Name
                  <input name="name" value={dogDraft.name} onChange={updateDogDraft} required />
                </label>
                <label className="form-field">
                  Breed
                  <input name="breed" value={dogDraft.breed} onChange={updateDogDraft} required />
                </label>
                <label className="form-field">
                  Age
                  <input name="age" value={dogDraft.age} onChange={updateDogDraft} placeholder="For example, 3 years" required />
                </label>
                <label className="form-field">
                  Gender
                  <input name="gender" value={dogDraft.gender} onChange={updateDogDraft} required />
                </label>
                <label className="form-field">
                  Tag
                  <select name="group" value={dogDraft.group} onChange={updateDogDraft}>
                    {filters.slice(1).map((filter) => <option key={filter}>{filter}</option>)}
                  </select>
                </label>
                <label className="form-field">
                  Favorite snacks
                  <input name="snacks" value={dogDraft.snacks} onChange={updateDogDraft} required />
                </label>
                <label className="form-field form-field-wide">
                  Personality
                  <textarea name="personality" value={dogDraft.personality} onChange={updateDogDraft} rows="3" required />
                </label>
                <label className="form-field form-field-wide">
                  Medication history
                  <textarea name="medications" value={dogDraft.medications} onChange={updateDogDraft} placeholder="Add details or write 'None reported'" rows="2" required />
                </label>
                <label className="form-field form-field-wide photo-field">
                  Photo
                  <input name="photo-upload" type="file" accept="image/*" onChange={updateDogPhoto} required={!dogDraft.photo} />
                  {dogDraft.photo && <img className="photo-preview" src={dogDraft.photo} alt={`Preview of ${dogDraft.name || 'your dog'}`} />}
                </label>
              </div>
              <div className="form-actions">
                <p>Profile details are shared as provided by you.</p>
                <button className="submit-dog-button" type="submit"><span aria-hidden="true">+</span> Post dog</button>
              </div>
            </form>
          </section>
        ) : (
          <>
            <section className="intro" aria-labelledby="page-title">
              <div className="intro-copy">
                <p className="eyebrow">A daily dose of very good dogs</p>
                <h1 id="page-title">The world is better<br />with <span>dogs in it.</span></h1>
              </div>
              <p className="intro-aside">Meet the neighborhood favorites, happy wanderers, and excellent nappers who make an ordinary day feel like a good one.</p>
              <div className="sun-stamp" aria-hidden="true">✳</div>
            </section>

            <section className="gallery" aria-label="Dog photo gallery">
              <div className="gallery-toolbar">
                <div className="filters" role="group" aria-label="Filter dogs">
                  {filters.map((filter) => (
                    <button
                      className={`filter-button${activeFilter === filter ? ' is-active' : ''}`}
                      key={filter}
                      type="button"
                      aria-pressed={activeFilter === filter}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <span className="results-count">{String(visibleDogs.length).padStart(2, '0')} GOOD DOGS</span>
              </div>

              <div className="dog-grid">
                {visibleDogs.map((dog, index) => (
                  <article className="dog-card" key={dog.slug} style={{ '--card-index': index }}>
                    <a className="dog-card-link" href={`#dog/${dog.slug}`} aria-label={`Read ${dog.name}'s profile`}>
                      <div className="photo-wrap">
                        <img
                          src={dog.photo || `https://images.unsplash.com/${dog.image}?auto=format&fit=crop&w=900&q=85`}
                          alt={dog.alt}
                          loading={index > 1 ? 'lazy' : 'eager'}
                        />
                        <span className="photo-number">NO. {String(dogList.indexOf(dog) + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="dog-info">
                        <div>
                          <h2>{dog.name}</h2>
                          <p className="breed">{dog.breed}</p>
                        </div>
                        <span className="paw-mark" aria-hidden="true">✳</span>
                        <p className="dog-note">{dog.note}</p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <span>MADE FOR THE LOVE OF DOGS</span>
        <span>TAKE THE LONG WAY HOME TODAY <span aria-hidden="true">↗</span></span>
      </footer>
    </div>
  );
}

export default App;
