//Script 1
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const questionName = form.getAttribute("id"); // Get the form's ID 
    
    form.addEventListener("submit", function () {
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        if (selectedOption) {
            sessionStorage.setItem(questionName, selectedOption.value);
        }
    });
});

//Script 2
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve all stored answers from sessionStorage
    const totalQuestions = 17;
    const resultsContainer = document.getElementById("results-container");

    // Categories and their associated questions
    const skills = {
        "Design communication": ["q1", "q2", "q3"],
        "Designing for everyone": ["q4", "q5"],
        "Designing strategically": ["q6", "q7", "q8"],
        "Designing together": ["q9", "q10", "q11"],
        "Evidence based design": ["q12", "q13"],
        "Iterative design": ["q14", "q15"],
        "Leading design": ["q16", "q17"],
    };

    // Result summaries for each skill
    const skillSummaries = {};
    let overallScore = 0;
    let totalSkillCount = 0;

    // Calculate scores for each skill
    for (const skill in skills) {
        const questions = skills[skill];
        let score = 0;

        questions.forEach((question) => {
            const answer = sessionStorage.getItem(question);
            if (answer) {
                // Assign point values based on answer
                switch (answer) {
                    case "apprentice":
                        score += 1;
                        break;
                    case "jnr-mid":
                        score += 2;
                        break;
                    case "snr":
                        score += 3;
                        break;
                    case "lead-head":
                        score += 4;
                        break;
                }
            }
        });

        // Store results for this skill
        const average = score / questions.length;
        overallScore += average;
        totalSkillCount += 1;

        let level;
        if (average <= 1.5) {
            level = "Apprentice - Junior";
        } else if (average <= 2.5) {
            level = "Midweight";
        } else if (average <= 3.5) {
            level = "Senior";
        } else {
            level = "Lead";
        }

        skillSummaries[skill] = level;
    }

    // Calculate overall level
    const overallAverage = overallScore / totalSkillCount;
    let overallLevel;
    if (overallAverage <= 1.5) {
        overallLevel = "between Apprentice Designer and Junior Interaction Designer";
    } else if (overallAverage <= 2.5) {
        overallLevel = "Midweight Interaction Designer ";
    } else if (overallAverage <= 3.5) {
        overallLevel = "Senior Interaction Designer";
    } else {
        overallLevel = "between Lead Interaction Designer and Head of interaction Design ";
    }

    // Display overall level
    const overallPanel = document.createElement("div");
    overallPanel.className = "nhsuk-panel nhsuk-panel--confirmation";
    overallPanel.innerHTML = `
        <h2 class="nhsuk-heading-m">Overall Level</h2>
        <p>Your scores indicate you are <strong>${overallLevel}</strong>.</p>
    `;
    resultsContainer.appendChild(overallPanel);

    // Create table for skill levels
    const table = document.createElement("table");
    table.className = "nhsuk-table";
    table.innerHTML = `
    <caption class="nhsuk-table__caption">Skills breakdown</caption>
        <thead>
            <tr>
                <th>Skill</th>
                <th>Level</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(skillSummaries)
                .map(
                    ([skill, level]) => `
                <tr>
                    <td>${skill}</td>
                    <td>${level}</td>
                </tr>
            `
                )
                .join("")}
        </tbody>
    `;
    resultsContainer.appendChild(table);

    // Retake quiz button
    document.getElementById("retake-quiz").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "/ixd/q1";
    });
});

