import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About NoteGalaxy</h2>
      <div className="card p-4 shadow-sm border-0 rounded-3">
        <p>
          <strong>NoteGalaxy</strong> is your personal digital notebook that helps you organize your thoughts,
          ideas, and tasks efficiently. Whether you’re a student, a professional, or a creative mind, our platform lets
          you create, edit, and manage your notes securely and with ease.
        </p>
        <p>
          This app is built using the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js) with features like:
        </p>
        <ul>
          <li> Create, Read, Update, Delete (CRUD) notes</li>
          <li> User authentication with JSON Web Tokens (JWT)</li>
          <li> Responsive UI using Bootstrap</li>
          <li> Notes are stored privately per user</li>
        </ul>
        <p>
          Our goal is to provide a minimal, distraction-free environment where you can keep track of your important information
          anytime, anywhere.
        </p>
      </div>

      <div className="card p-4 mt-4 shadow-sm border-0 rounded-3">
        <h4 className="mb-3">Developer Contact</h4>
        <ul className="list-unstyled">
          <li><strong>Name:</strong> Yashwanth Tokala</li>
          <li><strong>Email:</strong> yashwanthtokala106@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
