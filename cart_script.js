// Course AI Resilience Tracker (CART) Tool.
// HTML and JavaScript designed and built by Dr Philip Chambers, Instructional Design Specialist at Oregon State University Ecampus.
// Text content and plan designed by Ashlee Foster (Instructional Design Specialist), Dana Simionescu (Instructional Design Specialist), Philip Chambers (Instructional Design Specialist), Katherine McAlvage (Associate Director, Course Development and Training) and Cub Kahn (Blended & Hybrid Learning Consultant and College Liaison) of Oregon State University Ecampus.
// This work created by Oregon State University Ecampus is licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

let currentSection = 0;
const sections = document.querySelectorAll('.section');

function nextSection() {
    if (currentSection < sections.length - 1) {
        sections[currentSection].classList.remove('active');
        currentSection++;
        sections[currentSection].classList.add('active');
    }
    if (currentSection === sections.length - 1) {
        buildSummary();
    }
}

function previousSection() {
    if (currentSection > 0) {
        sections[currentSection].classList.remove('active');
        currentSection--;
        sections[currentSection].classList.add('active');
    }
}

// Section 1 Learning Outcomes Tool
const verbs = {
    define: "GenAI can give precise definitions of terms and concepts by referencing dictionaries, encyclopedias, and specialized resources.",
    describe: "GenAI can generate descriptive essays and summaries, providing detailed accounts and explanations of various topics based on extensive data.",
    identify: "GenAI can identify patterns and elements in data, images, or text.",
    discuss: "GenAI can generate discussions by analyzing and synthesizing information.",
    explain: "GenAI can explain concepts clearly and concisely by drawing on a vast repository of information, examples, and pre-trained models.",
    summarize: "GenAI can provide accurate summaries of texts and topics, distilling the main points and essential information effectively.",
    apply: "GenAI can apply learned concepts to new situations, following established patterns and rules.",
    calculate: "GenAI can perform calculations with high accuracy and speed, following predefined formulas and algorithms.",
    solve: "GenAI can solve problems by applying algorithms and heuristics.",
    analyze: "GenAI can analyze data and information to identify patterns, trends, and insights, leveraging statistical and computational methods.",
    compare: "GenAI can generate detailed comparisons between topics by analyzing similarities and differences using structured data.",
    research: "GenAI can assist in researching topics by gathering and organizing information from various sources.",
    assess: "GenAI can assess situations, performance, or outcomes using data-driven approaches and predefined metrics.",
    critique: "GenAI can critique works, ideas, or proposals by providing constructive feedback based on predefined criteria.",
    evaluate: "GenAI can evaluate options, arguments, and outcomes using established criteria and logical reasoning.",
    create: "GenAI can assist in creating content, though its originality may be limited to the data it has been trained on.",
    design: "GenAI can create designs and project plans, though its creativity might be limited, often following established patterns and best practices.",
    write: "GenAI can generate written content based on prompts and data."
};

// Checks for more than 5 selected in Learning Outcomes
document.querySelectorAll('#section1 input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const checkedBoxes = document.querySelectorAll('#section1 input[type="checkbox"]:checked');
        if (checkedBoxes.length > 5) {
            event.target.checked = false;
            document.getElementById('checkboxLimitMsg').style.display = 'block';
        } else {
            document.getElementById('checkboxLimitMsg').style.display = 'none';
        }
    });
});

function checkVulnerability() {
    const checkedBoxes = document.querySelectorAll('#section1 input[type="checkbox"]:checked');
    const resultDiv = document.getElementById('result');
    const adviceDiv = document.getElementById('result-advice');

    // If no checkboxes are selected, clicking the "Test Resiliency" button clears the feedback area and exits
    if (checkedBoxes.length === 0) {
        resultDiv.innerHTML = '';
        adviceDiv.innerHTML = '';
        resultDiv.style.display = 'none'; 
        adviceDiv.style.display = 'none'; 
        return; 
    }

    // If checkboxes are selected, it shows and populates the feedback section
    resultDiv.style.display = 'block';
    adviceDiv.style.display = 'block';
    resultDiv.innerHTML = '';

    let resultHTML = '<p><strong>Potential Resiliency Risks Found</strong>:</p><div class="vuln-box"><ul>';
    checkedBoxes.forEach(checkbox => {
        const verb = checkbox.value;
        resultHTML += `<li><strong><span class="lato-bold" style="color: #00006F">${verb}</span>:</strong> ${verbs[verb]}</li>`;
    });
    resultHTML += '</ul></div>';
    resultDiv.innerHTML = resultHTML;

    // Checks if the advice paragraph already exists in case a user clicks the "Test Resiliency" button more than once.
    if (!adviceDiv.querySelector('.suggest-box')) {
        const adviceParagraph = document.createElement('div');
        adviceParagraph.className = 'suggest-box';
        adviceParagraph.innerHTML = "<p>In light of these results, consider actions you can take to increase your course's AI resiliency. You can find more information and advice on how to achieve this in the next steps of this diagnostic tool.</p>";
        adviceDiv.appendChild(adviceParagraph);
    }
}

// Builds the Summary page at the end of the activity
function buildSummary() {
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = '';

    summaryContent.innerHTML += `<h2>${document.getElementById('course-id').value} AI Resiliency Summary Page</h2><hr>`;


    // Section 1
    summaryContent.innerHTML += '<h2>Learning Outcomes</h2>';
    summaryContent.innerHTML += '<p>Think about your Course Learning Outcomes (CLOs) relative to the capabilities of AI tools. Check the verbs that are used in your outcomes or verbs that are similar, then select “Test Resiliency” to evaluate how well AI tools handle tasks associated with these verbs. You can select up to 5 verbs at a time.</p>';
    summaryContent.innerHTML += `<div class="answer-box"><h3>Your Answer:</h3><p>${document.getElementById('result').innerHTML}</p></div>\n`;


    // Section 2
    summaryContent.innerHTML += '<br><h2>Your Learners</h2>';
    summaryContent.innerHTML += '<p>Think about your learners. Consider the following:</p><ul><li>What academic program(s) do learners come from, and why do they take the course?</li><li>What career paths do learners typically follow, and how is AI currently used in those fields?</li><li>What prior knowledge, skills, and/or experiences related to AI will learners come prepared with? (for example, it may be used in other classes) </li><li>What AI tools do learners currently have access to? (i.e., free, paid, institutionally provided with data protection).</li></ul></div>';

    summaryContent.innerHTML += `<div class='answer-box'><h3>Your Answer:</h3><p>${document.getElementById('section2-response').value}</p></div>\n\n`;
    summaryContent.innerHTML += "<div class='suggest-box'><p>In the context of resilient course design, it's essential to consider the diverse backgrounds, needs, academic journeys, and professional goals of learners. The learner profile is a key driver to the development of a flexible course that is robust enough to withstand changes and disruptions. Tailoring both the learning environment and learning experiences to identified student needs ensures that all students are well supported. Ideally, this will result in the development of learner confidence and motivation to adapt and persist. This approach also supports you in anticipating and responding to the evolving needs of learners in the face of emerging technologies.</p><p><strong>Important note</strong>: Consider data privacy and equity of access in all AI tools. At Oregon State University, faculty and students have free access to Microsoft Copilot with data protection when using OSU credentials to log in.</p></div>";


    // Section 3
    let answerBox3Content = '<br><h2>Learning Materials</h2>';
    answerBox3Content += '<div class="answer-box">';
    answerBox3Content += '<h3>Your Answer:</h3>';

    const section3Checkboxes = document.querySelectorAll('#section3 input[type="checkbox"]');
    section3Checkboxes.forEach(checkbox => {
        let labelText;

        if (checkbox.id === 'other-checkbox') {
            // Special handling for the "Other" checkbox
            if (checkbox.checked) {
                const otherText = document.getElementById('other-text').value.trim();
                labelText = `Other (please specify): ${otherText}`;
            } else {
                labelText = 'Other (please specify): ';
            }
        } else if (checkbox.nextElementSibling) {
            labelText = checkbox.nextElementSibling.textContent;
        } else {
            labelText = checkbox.getAttribute('data-label');
        }

        answerBox3Content += `<p>${checkbox.checked ? '<span class="checked-choice">[✓]' : '<span class="unchecked-choice">[X]'} ${labelText}</span></p>\n`;
    });

    // Close the "answer-box" div
    answerBox3Content += '</div>';

    // Add the content to the summary
    summaryContent.innerHTML += answerBox3Content;

    // Add feedback from the section
    summaryContent.innerHTML += `<p>${document.getElementById('section3-feedback').innerHTML}</p>\n\n`;

    // Section 4
    summaryContent.innerHTML += '<br><h2>Activities and Assessments</h2>';
    summaryContent.innerHTML += '<p>Do specific activities, tasks, and assignments in the course articulate if/when/how generative AI may be used?</p>';
    const q4_Response = document.querySelector('input[name="q4"]:checked');
    if (q4_Response) {
        summaryContent.innerHTML += `<div class="answer-box"><h3>Your Answer:</h3><p>Response: ${q4_Response.value}</p></div>\n`;
        summaryContent.innerHTML += `<p>${document.getElementById('q4-feedback').innerHTML}</p>\n`;
    }
    summaryContent.innerHTML += '<p>Consider your assessment approach. Are students given multiple opportunities to demonstrate the process of learning? For example, low-stakes or formative assessments before higher-stakes, summative assessments.</p>';
    const q5_Response = document.querySelector('input[name="q5"]:checked');
    if (q5_Response) {
        summaryContent.innerHTML += `<div class="answer-box"><h3>Your Answer:</h3><p>Response: ${q5_Response.value}</p></div>\n`;
        summaryContent.innerHTML += `<p>${document.getElementById('q5-feedback').innerHTML}</p>\n`;
    }

    // Start the "answer-box" div for Q6
    let answerBox6Content = '<p>Does the course employ one or more methods for promoting academic integrity in assessments?</p>';
    answerBox6Content += '<div class="answer-box">';
    answerBox6Content += '<h3>Your Answer:</h3>'

    const q6_Checkboxes = document.querySelectorAll('#section4 input[type="checkbox"]');
    q6_Checkboxes.forEach(checkbox => {
        let labelText;

        if (checkbox.id === 'q6-other-checkbox') {
            // Special handling for the "Other" checkbox
            if (checkbox.checked) {
                const otherText = document.getElementById('q6-other-text').value.trim();
                labelText = `Other: ${otherText}`;
            } else {
                labelText = 'Other: ';
            }
        } else if (checkbox.nextElementSibling) {
            labelText = checkbox.nextElementSibling.textContent;
        } else {
            labelText = checkbox.getAttribute('data-label');
        }

        answerBox6Content += `<p>${checkbox.checked ? '<span class="checked-choice">[✓]' : '<span class="unchecked-choice">[X]'} ${labelText}</span></p>`;
    });

    // Closes the "answer-box" div
    answerBox6Content += '</div>';

    // Insert the content into the summary
    summaryContent.innerHTML += answerBox6Content;

    // Add feedback from the section
    summaryContent.innerHTML += `<p>${document.getElementById('section4-feedback').innerHTML}</p>\n\n`;


    // Section 5
    summaryContent.innerHTML += '<br><h2>Course Policies</h2>';
    summaryContent.innerHTML += '<p>Does the course syllabus include a clear policy on student GenAI use?</p>';
    const q7_Response = document.querySelector('input[name="q7"]:checked');
    if (q7_Response) {
        summaryContent.innerHTML += `<div class="answer-box"><h3>Your Answer:</h3><p>Response: ${q7_Response.value}</p></div>\n`;
        summaryContent.innerHTML += `<p>${document.getElementById('q7-feedback').innerHTML}</p>\n`;
    }
    summaryContent.innerHTML += `<p>Remember that students are looking for clear guidance from their faculty when it comes to if, where, and how GenAI may be used in a course. Here are the sample statements from the previously selected checkboxes, which may help you to craft or improve your policy.</p>${document.getElementById('q7-follow-on-feedback').innerHTML}\n\n`;


    // Section 6 (Next Steps)
    summaryContent.innerHTML += '<br><h2>Next Steps</h2>';
    summaryContent.innerHTML += '<p>Which of the following approaches might you take in your course going forward?</p>';
    const selectedButton = document.querySelector('input[name="q8"]:checked');
    let selectedText = selectedButton ? selectedButton.parentElement.textContent : 'Not selected';

    // Cleans up white space that seems to exist from HTML (Might be resolved?)
    selectedText = selectedText.replace(/\s+/g, ' ').trim();

    summaryContent.innerHTML += `<div class="answer-box"><h3>Your Answer:</h3><p>${selectedText}</p></div>\n`;
    summaryContent.innerHTML += `<p>${document.getElementById('q8-feedback').innerHTML}</p>\n\n`;

    // Helpful Suggestions
    summaryContent.innerHTML += '<br><h2>Helpful suggestions and resources</h2>';
    summaryContent.innerHTML += "<ul><li><a target='_blank' href='https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/practical-strategies/#sample'>Oregon State University Ecampus - Sample Syllabus Statements</a></li><li><a target='_blank' href='https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/creating-your-course-policy-ai'>Stanford University - Creating Your Course Policy on AI</a></li></ul>\n\n";

    // "Restart Activity" Button
    summaryContent.innerHTML += `<button onclick="location.reload();">Restart Activity</button>\n`;
}




function printSummary() {
    window.print();
}

function handleCheckboxChange(event) {
    const target = event.target;
    if (target.id === 'other-checkbox') {
        handleOtherCheckbox();
    }
}

function handleOtherCheckbox() {
    const otherText = document.getElementById('other-text');
    otherText.style.display = document.getElementById('other-checkbox').checked ? 'block' : 'none';
}

function submitSection3() {
    const checkboxes = document.querySelectorAll('#section3 input[type="checkbox"]');
    let allChecked = true;
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked && checkbox.id !== 'other-checkbox') {
            allChecked = false;
        }
    });
    const feedback = document.getElementById('section3-feedback');
    feedback.innerHTML = allChecked ? "<div class='suggest-box'><p>Great job! It sounds like you are already using many strategies to make your course AI-resilient through careful creation and curation of the learning materials.</p></div>" : " <div class='suggest-box'><p>Flexibility of learning materials contributes to the resilience of a course by making it capable of providing learners with a high-quality educational experience, regardless of the context (e.g., technological disruptions, world events, shifts in student needs).</p> <ul><li><strong>Adaptability</strong>: Courses can quickly pivot in response to unexpected events while maintaining continuity in the class.</li><li><strong>Personalization</strong>: Materials can be tailored to meet the individual needs, preferences, and interests of learners.</li><li><strong>Learner agency</strong>: When students have a say in how they learn and can make choices about their activities and assessments, they are likely to be more engaged and motivated.</li><li><strong>Engagement</strong>: A variety of materials can keep students interested and motivated.</li><li><strong>Support</strong>: A flexible design provides a framework for support mechanisms that can help students overcome obstacles and succeed in their studies.</li></ul></div>";
}

function handleQ4Change(value) {
    const feedback = document.getElementById('q4-feedback');
    feedback.innerHTML = value === "yes" ? "<div class='suggest-box'><p>Great! If AI is allowed, make sure you also include specific examples to help students understand exactly what's expected of them and reduce the risk of unintentional academic integrity violations.</p></div>" : "<div class='suggest-box'><p>Providing clear guidelines for each task eliminates ambiguity about AI use. This transparency helps students understand exactly what's expected of them and reduces the risk of unintentional academic integrity violations. Consider including such guidance in each assignment, with examples.</p></div>";
}

function handleQ5Change(value) {
    const feedback = document.getElementById('q5-feedback');
    feedback.innerHTML = value === "yes" ? "<div class='suggest-box'><p>Well done! This approach allows for a more nuanced and accurate assessment of student learning, which is less likely to be skewed by inappropriate AI use.</p></div>" : "<div class='suggest-box'><p>Such an approach is recommended to ensure that learning isn't undermined or circumvented. It allows for a more nuanced and accurate assessment of student learning, which is less likely to be skewed by inappropriate AI use. Consider adding stages for assessment and feedback within your major assignments.</p></div>";
}

function handleQ6Change(event) {
    const target = event.target;
    if (target.id === 'q6-other-checkbox') {
        handleQ6OtherCheckbox();
    }
}

function handleQ6OtherCheckbox() {
    const otherText = document.getElementById('q6-other-text');
    otherText.style.display = document.getElementById('q6-other-checkbox').checked ? 'block' : 'none';
}

function submitSection4() {
    const checkboxes = document.querySelectorAll('#section4 input[type="checkbox"]');
    let anyChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            anyChecked = true;
        }
    });
    const feedback = document.getElementById('section4-feedback');
    feedback.innerHTML = anyChecked ? "<div class='suggest-box'><p>You're on the right path to creating a resilient and effective learning environment by promoting academic integrity. Remember that approaches to academic integrity may need to be adjusted over time, particularly in response to the evolution of GenAI.</p></div>" : "<div class='suggest-box'><p>Consider implementing some of the methods above and/or exploring others that fit your course context. The goal is to create an environment where students understand the value of integrity and are motivated to uphold it.</p></div>";
}

function handleQ7Change(value) {
    const feedback = document.getElementById('q7-feedback');
    feedback.innerHTML = value === 'Yes, the syllabus has a GenAI policy.' ? "<div class='suggest-box suggest-check'><p>Well done! A clear and transparent AI course policy can:</p><ul><li> Help students use GenAI tools accurately, ethically, and productively</li><li> Create the foundation for an equitable learning experience</li><li> Identify expectations</li><li> Clarify course and institutional policies</li><li> Promote academic integrity</li><li> Encourage critical thinking</li><li> Demonstrate that the course is up to date on technological advancements</li></ul></div>" : "<div class='suggest-box suggest-check'><p>Have you considered including a GenAI policy in your syllabus? A clear and transparent AI course policy can:</p><ul><li> Help students use GenAI tools accurately, ethically, and productively</li><li> Create the foundation for an equitable learning experience</li><li> Identify expectations</li><li> Clarify course and institutional policies</li><li> Promote academic integrity</li><li> Encourage critical thinking</li><li> Demonstrate that the course is up to date on technological advancements</li></ul></div>";
    const followOnAppear = document.getElementById('q7-follow-on');
    followOnAppear.style.display = 'block';
}

// Checks for more than 3 selected in Course Policies
document.querySelectorAll('#section5 input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const policyCheckedBoxes = document.querySelectorAll('#section5 input[type="checkbox"]:checked');
        if (policyCheckedBoxes.length > 3) {
            event.target.checked = false;
            document.getElementById('checkboxLimitMsg2').style.display = 'block';
        } else {
            document.getElementById('checkboxLimitMsg2').style.display = 'none';
        }
        // Call the function after adjusting the checkbox state
        coursePolicyFollowOn();
    });
});

const coursePolicies = {
    "Clearly define GenAI tools and any allowed use.": "<p><strong>Sample Definition and Use Statement</strong></p><p>In this course, 'AI tools' refers to any artificial intelligence-powered tools that can generate text, code, or other content. This includes, but is not limited to, generative AI tools (e.g., ChatGPT, Copilot, Gemini, and Claude). This policy also encompasses AI-powered writing assistants <strong>[insert examples]</strong>, code completion tools <strong>[insert examples]</strong>, and automated research platforms <strong>[insert examples]</strong>.</p><p>What tools can I use in this class and why? <strong>[insert tools and rationale]</strong> </p><p>What tools can I not use in this class and why? <strong>[insert tools and rationale]</strong></p>",
    "Articulate allowed and prohibited uses with specific scenarios.": "<p><strong>Sample Scenarios</strong></p><p><strong>Allowed Uses</strong>:</p><ul><li>Use AI tools for brainstorming or generating initial ideas, provided that the final work is substantively your own.</li><li>Employ AI for proofreading or grammar checking, similar to tools like Grammarly.</li><li>Utilize AI to explain complex concepts or provide additional context for your learning, as long as the output isn't directly incorporated into graded work without proper attribution.</li></ul><p><strong>Prohibited Uses</strong>:</p><ul><li>Use of AI-generated content as your original work without substantial modification or proper attribution.</li><li>Use of GenAI to complete take-home exams or quizzes.</li><li>Use of GenAI to write a significant portion, or the entirety, of assignments without permissions.</li></ul>",
    "Identify potential consequences for prohibited GenAI use, including the accountability process.": "<p>Prohibited use of GenAI tools constitutes academic misconduct. Academic misconduct is handled according to the institution's <strong>[insert institution]</strong> academic integrity policy and/or Student Code of Conduct <strong>[insert link to institutional policy]</strong>, which may include consequences such as, but not limited to, <strong>[insert potential consequences]</strong>.</p>",
    "Share a detailed GenAI policy rationale.": "<p><strong>Sample GenAI Policy Rationale Statement</strong></p><p>This AI policy is designed to promote learning, growth, and development, while acknowledging the evolving role of AI in education and professional fields. The goal is to prepare learners for a future where GenAI is used as a tool to enhance human capabilities, not to replace them. This policy aligns with ethical standards in <strong>[insert discipline/field/industry]</strong>, where professionals are expected to understand and responsibly use GenAI while maintaining core competencies and critical thinking skills. Please direct any questions to the instructor.</p>",
    "Articulate expectations for GenAI disclosure and attribution (citation).": "<p><strong>Sample Disclosure Statement</strong></p><p>When the use of GenAI tools is allowed on assignments, include a disclosure statement with the submission. Include the following elements in the disclosure statement:</p><ul><li>Identify specific GenAI tool(s) used (e.g., ChatGPT).</li><li>Include an accurate attribution of all quotations and/or paraphrases of AI-generated content using discipline-specific citation conventions.<ul><li><a target='_blank' href='https://apastyle.apa.org/blog/how-to-cite-chatgpt'>APA</a></li><li><a target='_blank' href='https://style.mla.org/citing-generative-ai/'>MLA</a></li><li><a target='_blank' href='https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Documentation/faq0422.html'>Chicago</a></li></ul></li><li>Explain how the tool(s) were used (e.g., brainstorming, grammar check).</li><li>Describe the level of GenAI contribution to the final work.</li></ul>",
    "Share strategies for responsible GenAI use in learning.": "<p><strong>Sample Statements</strong></p><ul><li>Use GenAI as a learning aid, not a substitute for your own critical thinking. Reflect on AI-generated content and how it contributes to your learning process.</li><li>Develop familiarity with the limitations of the tool(s)<ul><li>Verify the information.</li><li>Examine the sources of supplied information, and to determine if they are reputable/credible.</li></ul></li><li>Use prompts that will help you to explore topics and concepts at a deeper level, versus a prompt that will result in a surface-level answer.</li><li>Reflect on AI-generated content and how it contributes to your learning process.</li><li>Represent your academic voice and perspective in your work.</li><li>Ask questions and engage in dialogue with your instructor and peers.</li></ul>",
    "Foster open dialogue about AI use in the course and beyond.": "<p><strong>Sample Statement</strong></p><p>Open discussions about the use of GenAI tools in coursework is highly encouraged. If you have questions about the AI course policy, or want to explore how GenAI might be used in a specific assignment, please don't hesitate to ask. Let's discuss AI's impact on your field of study and explore its potential together. Consider sharing your inquiries and perspectives with the class in the “AI Curiosity Corner!” Alternatively, please contact the instructor directly if you prefer.</p>"
}


function coursePolicyFollowOn() {
    const policyCheckedBoxes = document.querySelectorAll('#section5 input[type="checkbox"]:checked');
    const CoursePolicyFollowOnDiv = document.getElementById('q7-follow-on-feedback');
    const followOnFeedbackAppear = document.getElementById('q7-follow-on-feedback');
    
    // Checks if there are no selected checkboxes
    if (policyCheckedBoxes.length === 0) {
        // Hide the feedback section if no checkboxes are checked. Without this part the .suggest-box div remains when checkboxes are unchecked 
        followOnFeedbackAppear.style.display = 'none';
         // Clear any existing content
        CoursePolicyFollowOnDiv.innerHTML = ''; 
        // This exits the function early and doesn't continue to display the feedback
        return;
    }

    // If checkboxes are selected, show the follow-on feedback as normal
    followOnFeedbackAppear.style.display = 'block';
    CoursePolicyFollowOnDiv.innerHTML = '';

    let resultHTML = '<div class="suggest-box">';
    policyCheckedBoxes.forEach(checkbox => {
        const coursePolicyValue = checkbox.value;
        resultHTML += `<p><strong><span class="lato-bold" style="color: #00006F">${coursePolicyValue}</span></strong> ${coursePolicies[coursePolicyValue]}</p>`;
    });
    resultHTML += '</div>';

    CoursePolicyFollowOnDiv.innerHTML = resultHTML;
}


// This is not used without a 'Get Feedback' button on Next Steps.

// function submitSection6() {
//     const selectedButton = document.querySelector('input[name="q8"]:checked');
//     if (selectedButton) {
//         handleQ8Change();
//     } else {
//         document.getElementById('q8-feedback').innerHTML = "Please select an option before getting feedback.";
//     }
// }

//

function handleQ8Change() {
    const feedback = document.getElementById('q8-feedback');
    const selectedButton = document.querySelector('input[name="q8"]:checked');
    let feedbackText;

    switch (selectedButton.value) {
        case 'build-in-purposeful':
            feedbackText = `<div class='suggest-box-next'><h2>Incorporating GenAI Tools Purposefully</h2><ul><li><strong>Integration with Course Outcomes</strong>: Consider where student GenAI use <a target='_blank' href="https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/blooms-taxonomy-revisited/">aligns with course outcomes</a> and prepares students for professional contexts; use <a target='_blank' href="https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/decision-tree/">Ecampus' AI decision tree</a> to assist in making these decisions. Communicate GenAI integration as part of an <a target='_blank' href="https://canvas.oregonstate.edu/courses/1965953/pages/ctl-guidance-for-syllabus-statements-about-ai-use?module_item_id=23771568">updated course policy</a>.</li><li><strong>Guided Usage</strong>: Aim to provide structured guidance on how to use GenAI tools effectively and ethically, focusing on critical thinking and evaluating output for bias, inaccuracies, and misinformation.</li><li><strong>Opt-in Model</strong>: Consider allowing students to choose whether to use GenAI tools, accommodating varying comfort levels. Students may have concerns about data privacy and the environmental impact of GenAI use.</li><li><strong>Equitable Access</strong>: Ensure that all students have equitable access to high-quality GenAI tools where their data will be kept secure, such as through an institutionally-supported tool. Evaluate the accessibility of any suggested or required tools to ensure they do not create <a target='_blank' href="https://dl.acm.org/doi/10.1145/3597638.3614548">unintended barriers for students with disabilites</a>.</li><li><strong>Update Assessments</strong>: Revise assessment prompts to take co-created work between a student and a GenAI into account, particularly with respect to grading and evaluation. See Ecampus' assessment redesign resource for further guidance.</li><li><strong>Additional Resources</strong>:</li><ul><li>Student Perceptions of Generative AI tools in Online Courses: Recommendations for Faculty, from OSU Ecampus</li><li>Assignment examples, from OSU Ecampus</li><li><a target='_blank' href="https://mitsloanedtech.mit.edu/ai/teach/getting-started/">Getting Started with AI-Enhanced Teaching: A Practical Guide for Instructors, from MIT</a></li></ul></ul></div>`;
            break;
        case 'clearly-delineate':
            feedbackText = `<div class='suggest-box-next'><h2>Restricting GenAI Tool Usage</h2><ul><li><strong>Rationale and Communication:</strong> Clearly communicate why GenAI tool use is restricted. Highlight the importance of developing critical thinking, problem-solving, and creativity skills. Being transparent helps students understand and follow your guidelines.</li><li><strong>Assessment Design:</strong> Consider adapting assignments to discourage use of AI. <a target='_blank' href="https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/blooms-taxonomy-revisited/">Review your course learning outcomes against what GenAI tools can do</a>, and align tasks that necessitate human-centric abilities and design assessments that require original thought, analysis, and application of knowledge, rather than mere information retrieval or generation.</li><li><strong>Incorporate Alternatives:</strong> Provide other resources or methods for students to achieve the same learning goals without using GenAI tools. Make sure students have access to traditional learning tools that encourage independent thinking.</li><li><strong>Clear Policies and Enforcement:</strong> Set and enforce clear rules about using GenAI tools in your course. Include these rules in your syllabus and ensure students understand the consequences of breaking them.</li><li><strong>Support Ethical Use:</strong> Encourage discussions about the ethical use of GenAI. Help students understand the importance of honesty in their academic work. Use real-life examples to show the risks of relying too much on GenAI.</li><li><strong>Feedback and Revision:</strong> Regularly ask students about their experiences with the GenAI restrictions. Use this feedback to improve your teaching strategies and ensure the restrictions help rather than hinder learning.</li></ul></div>`;
            break;
        case 'some-combination':
            feedbackText = `<div class='suggest-box-next'><h2>Combining Case-Specific AI Use with Selective Restrictions</h2><ul><li><strong>Strategic Integration:</strong> Identify parts of the course, and corresponding course outcomes, <a target='_blank' href="https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/blooms-taxonomy-revisited/">where GenAI can enhance learning</a> or where particular applications of AI use are already essential in related careers.</li><li><strong>Selective Restrictions:</strong> Discourage, limit, or exclude AI use in areas critical for skill development or in areas where AI use would likely circumvent learning.</li><li><strong>Clear Rationale:</strong> Describe on the syllabus and on individual assignments the <a target='_blank' href="https://canvas.oregonstate.edu/courses/1965953/pages/ai-sample-syllabus-statements-and-assignment-language?wrap=1">justification for allowance</a> of AI use in some learning activities or assessments and the restriction of AI use in other cases.</li><li><strong>Questions Encouraged:</strong> Invite students to ask you about AI use on a particular assignment or assessment prior to beginning the task.</li><li><strong>Balanced Learning Experience:</strong> Overall, create a <a target='_blank' href="https://ecampus.oregonstate.edu/faculty/artificial-intelligence-tools/practical-strategies/">balanced approach</a> that integrates human skills and AI-enhanced capabilities into an optimal learning experience.</li></ul></div>`;
            break;
        default:
            feedbackText = 'Please select an option before getting feedback.';
    }

    feedback.innerHTML = feedbackText;
}

// Event listeners for sections 3 and 4 (the checkboxes)
document.querySelectorAll('#section3 input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

document.querySelectorAll('#section4 input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleQ6Change);
});