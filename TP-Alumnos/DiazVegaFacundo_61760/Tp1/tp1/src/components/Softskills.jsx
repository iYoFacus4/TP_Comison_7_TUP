import { softSkillsData } from "../data/data";

const SoftSkills = () => {
  return (
    <section id="soft-skills" className="section-padding">
      <h2 className="section-title">Soft Skills</h2>
      <ul className="card-list">
        {softSkillsData.map((skill, index) => (
          <li key={index} className="card">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SoftSkills;