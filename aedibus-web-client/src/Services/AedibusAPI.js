import {HttpGet, HttpPostForm, HttpPostJSON} from "./HTTP";

////////////////////////////
///// Course Services /////
///////////////////////////

/**
 * Creates a course.
 * @param title the title
 * @param description the description
 * @param studentList the student list
 * @returns TODO
 */
export const createCourse = async (title, description, studentList) => {
    let res = await HttpPostJSON("/courses", JSON.stringify({
        title: title,
        description: description,
        studentList: studentList,
    }));

    // TODO validate status code

    return res.json();
}

/**
 * Gets courses for a teacher
 * @returns TODO
 */
export const getCoursesForTeacher = async () => {
    let res = await HttpGet('/courses/taught')

    // TODO validate status code

    return await res.json();
}

/**
 * Gets courses for a student
 * @returns TODO
 */
export const getCoursesForStudent = async () => {
    let res = await HttpGet('/courses/enrolled');

    // TODO validate status code

    return await res.json();
}

/**
 * Gets a course by its course ID.
 * @param courseId the course ID
 * @returns TODO
 */
export const getCourse = async (courseId) => {
    let res = await HttpGet(`/courses/${courseId}`);

    // TODO validate status code

    return res.json();
}

////////////////////////////////
///// Assignment Services /////
///////////////////////////////

/**
 * Creates a course
 * @param courseId the course ID
 * @param title the title
 * @param testSuite the test suite
 * @param readme the readme
 * @returns TODO
 */
export const createAssignment = async (courseId, title, testSuite, readme) => {
    const formData  = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("TestSuite.java", new Blob([testSuite]), "TestSuite.java");
    formData.append("README.md", new Blob([readme]), "TestSuite.java");

    let res = await HttpPostForm('/assignments', formData);

    // TODO validate status code

    return res.json();
}

/**
 * Gets an assignment.
 * @param assignmentId the assignment ID
 * @returns TODO
 */
export const getAssignment = async (assignmentId) => {
    let res = await HttpGet(`/assignments/${assignmentId}`);

    // TODO validate status code

    return res.json();
}

/**
 * Gets the README.md for an assignment.
 * @param assignmentId the assignment ID
 * @returns TODO
 */
export const getReadme = async (assignmentId) => {
   let res = await HttpGet(`/assignments/${assignmentId}/readme`);

    // TODO validate status code;

    return await res.text();
}

/**
 * Gets the TestSuite.java for an assignment
 * @param assignmentId the assigment ID
 * @returns  TODO
 */
export const getTestSuite = async (assignmentId) => {
    let res = await HttpGet(`/assignments/${assignmentId}/testsuite`);

    // TOOD validate status code

    return await res.text();
}

/**
 * Gets the participation list for an assignment.
 * @param assignmentId the assignment ID
 * @returns TODO
 */
export const getParticipationList = async (assignmentId) => {
    let res = await HttpGet(`/assignments/${assignmentId}/participation`)

    // TOOD validate status code

    return await res.json();
}

////////////////////////////////
///// Assignment Services /////
///////////////////////////////

/**
 * Submits an assignment for a student.
 * @param assignmentId the assignment ID
 * @param solution the solution
 * @returns TODO
 */
export const submitAssignment = async (assignmentId, solution) => {
    const formData  = new FormData();
    formData.append("Solution.java", new Blob([solution]), "Solution.java");
    formData.append("assignmentId", assignmentId);

    let res = await HttpPostForm('/submissions', formData)

    // TODO validate status code;

    return res.json();
}

/**
 * Gets a submission or an instructor.
 * @param submissionId the submission ID
 * @returns TODO
 */
export const getSubmissionForInstructor = async (submissionId) => {
    let res = await HttpGet(`/submissions/${submissionId}/instructor`);

    // TODO validate status code;

    return res.json();
}

/**
 * Gets a submission by its assignmentID
 * @param assignmentId the assignment ID
 * @returns TODO
 */
export const getSubmissionByAssignmentId = async (assignmentId) => {
    let res = await HttpGet(`/submissions/${assignmentId}`);

    if (res.status !== 200) return null;

    // TODO validate status code;

    return res.json();
}

/**
 * Gets the student submitted solution.
 * @param submissionId the submission ID
 * @returns TODO
 */
export const getSolution = async (submissionId) => {
    let res = await HttpGet(`/submissions/${submissionId}/solution`)

    // TODO validate status code;

    return res.text();
}

/**
 * Gets the test results of a submission.
 * @param submissionId the submission ID
 * @returns TODO
 */
export const getResults = async (submissionId) => {
    let res = await HttpGet(`/submissions/${submissionId}/results`)

    // TODO validate status code;

    return res.json();
}