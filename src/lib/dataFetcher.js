
export async function fetchSubjects(semester) {



    try {
        const res = await fetch(
            `${process.env.URL}/api/subject/${semester || ''}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                },
                cache: 'no-store'
            },
        )
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchStudents() {

    try {
        const res = await fetch(
            `${process.env.URL}/api/student`,
            {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                },
                cache: 'no-store'
            },
        )
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchFaculties() {

    try {
        const res = await fetch(
            `${process.env.URL}/api/faculty`,
            {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                },
                cache: 'no-store'
            },
        )
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchDepartments() {

    try {
        const res = await fetch(
            `${process.env.URL}/api/department`,
            {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                },
                cache: 'no-store'
            },
        )
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createUpdateSubjects(_id, name, code, semester, department, isUpdate) {

    try {
        const method = isUpdate ? 'PUT' : 'POST';
        const res = await fetch(
            `/api/subject`,
            {
                method,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id, name, code, semester, department }),
                cache: 'no-store'
            },
        )

        return res.json();

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function createUpdateStudents(_id, name, userId, registration_number, semester, department, batch, isUpdate) {

    try {
        const method = isUpdate ? 'PUT' : 'POST';
        const res = await fetch(
            `/api/student`,
            {
                method,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id, name, userId, registration_number, semester, department, batch, password: userId }),
                cache: 'no-store'
            },
        )

        return res.json();

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function createUpdateFaculties(_id, name, userId, email, department, isUpdate) {

    try {
        const method = isUpdate ? 'PUT' : 'POST';
        const res = await fetch(
            `/api/faculty`,
            {
                method,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id, name, userId, email, department, password: userId }),
                cache: 'no-store'
            },
        )

        return res.json();

    } catch (error) {
        throw new Error(error.message)
    }
}

export async function createUpdateDepartments(_id, name, code, isUpdate) {

    try {
        const method = isUpdate ? 'PUT' : 'POST';
        const res = await fetch(
            `/api/department`,
            {
                method,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id, name, code }),
                cache: 'no-store'
            },
        )

        return res.json();

    } catch (error) {
        throw new Error(error.message)
    }
}


export async function createUpdateClasses(subject, faculty, isUpdate) {

    try {
        const method = isUpdate ? 'PUT' : 'POST';
        const res = await fetch(
            `/api/class`,
            {
                method,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ subject, faculty }),
                cache: 'no-store'
            },
        )

        return res.json();

    } catch (error) {
        throw new Error(error.message)
    }
}
