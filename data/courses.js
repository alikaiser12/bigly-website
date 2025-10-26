const courses = [
  {
    slug: 'react-from-scratch',
    title: 'React from Scratch',
    description: 'A practical course that teaches React fundamentals and modern patterns by building real features.',
    youtubeId: 'dGcsHMXbSOA',
    duration: '3h 20m',
    level: 'Beginner → Intermediate',
    category: 'Web Development',
  },
  {
    slug: 'python-for-web',
    title: 'Python for Web Development',
    description: 'Learn how to build APIs and simple web apps using Python and popular frameworks.',
    youtubeId: 'rfscVS0vtbw',
    duration: '2h 10m',
    level: 'Beginner',
    category: 'Backend',
  }
];

// helper to add thumbnail url dynamically
export default courses.map(c => ({
  ...c,
  thumbnail: `https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`,
}));
