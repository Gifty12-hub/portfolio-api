require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Education = require('../models/Education');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Education.deleteMany({});
    console.log('Cleared existing data...');

    // Seed Users
    const users = await User.insertMany([
      {
        name: 'Gifty Mensah',
        email: 'gifty@example.com',
        title: 'Full-Stack Web Developer',
        bio: 'Passionate developer based in Ghana, building impactful tech solutions.',
        location: 'Accra, Ghana',
        github: 'https://github.com/gifty',
        linkedin: 'https://linkedin.com/in/gifty'
      },
      {
        name: 'Ama Boateng',
        email: 'ama@example.com',
        title: 'Frontend Developer',
        bio: 'UI/UX focused developer who loves creating beautiful web experiences.',
        location: 'Kumasi, Ghana',
        github: 'https://github.com/amaboateng',
        linkedin: 'https://linkedin.com/in/amaboateng'
      }
    ]);
    console.log(`Seeded ${users.length} users`);

    // Seed Skills (linked to first user)
    const skills = await Skill.insertMany([
      {
        name: 'JavaScript',
        category: 'Programming Language',
        proficiency: 'advanced',
        yearsOfExperience: 3,
        userId: users[0]._id
      },
      {
        name: 'Node.js',
        category: 'Backend Framework',
        proficiency: 'intermediate',
        yearsOfExperience: 2,
        userId: users[0]._id
      },
      {
        name: 'MongoDB',
        category: 'Database',
        proficiency: 'intermediate',
        yearsOfExperience: 1,
        userId: users[0]._id
      },
      {
        name: 'React',
        category: 'Frontend Framework',
        proficiency: 'beginner',
        yearsOfExperience: 1,
        userId: users[1]._id
      }
    ]);
    console.log(`Seeded ${skills.length} skills`);

    // Seed Projects (linked to first user)
    const projects = await Project.insertMany([
      {
        title: 'Portfolio Builder API',
        description: 'A REST API for managing developer portfolios with full CRUD operations.',
        techStack: ['Node.js', 'Express', 'MongoDB', 'Swagger'],
        liveUrl: 'https://portfolio-api-slrv.onrender.com',
        githubUrl: 'https://github.com/Gifty12-hub/portfolio-api',
        status: 'completed',
        userId: users[0]._id
      },
      {
        title: 'MamaMatch GH',
        description: 'A WhatsApp-based AI chatbot connecting pregnant women in rural Ghana to midwives.',
        techStack: ['Python', 'WhatsApp API', 'AI/ML'],
        githubUrl: 'https://github.com/gifty/mamamatch',
        status: 'completed',
        userId: users[0]._id
      },
      {
        title: 'Handcrafted Haven',
        description: 'A Next.js marketplace for handcrafted goods built as a team project.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        status: 'in-progress',
        userId: users[1]._id
      }
    ]);
    console.log(`Seeded ${projects.length} projects`);

    // Seed Education (linked to first user)
    const education = await Education.insertMany([
      {
        institution: 'Brigham Young University - Idaho',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Web Development',
        startYear: 2022,
        current: true,
        description: 'Studying web development with focus on full-stack technologies.',
        userId: users[0]._id
      },
      {
        institution: 'She Code Africa',
        degree: 'Certificate',
        fieldOfStudy: 'Software Engineering',
        startYear: 2021,
        endYear: 2022,
        current: false,
        description: 'Completed intensive software engineering program focused on women in tech.',
        userId: users[0]._id
      },
      {
        institution: 'Women Techsters Bootcamp',
        degree: 'Certificate',
        fieldOfStudy: 'Mobile Development',
        startYear: 2023,
        endYear: 2023,
        current: false,
        description: 'Bootcamp covering mobile app development and tech entrepreneurship.',
        userId: users[1]._id
      }
    ]);
    console.log(`Seeded ${education.length} education records`);

    console.log('\n✅ Database seeded successfully!');
    console.log('-----------------------------------');
    console.log(`Users:     ${users.length}`);
    console.log(`Skills:    ${skills.length}`);
    console.log(`Projects:  ${projects.length}`);
    console.log(`Education: ${education.length}`);
    console.log('-----------------------------------');
    console.log('User IDs (use these for testing):');
    users.forEach(u => console.log(`  ${u.name}: ${u._id}`));

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedDatabase();