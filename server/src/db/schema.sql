CREATE TABLE IF NOT EXISTS user
(
    id       TEXT NOT NULL,
    email    TEXT NOT NULL,
    name     TEXT NOT NULL,
    password TEXT NOT NULL,

    PRIMARY KEY (email)
);
CREATE TABLE IF NOT EXISTS budget
(
    id        TEXT              NOT NULL,
    amount    INTEGER DEFAULT 0 NOT NULL,
    date      DATE              NOT NULL,
    userEmail TEXT              NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (userEmail) REFERENCES user (email)
);
CREATE TABLE IF NOT EXISTS expense
(
    id          TEXT     NOT NULL,
    amount      INTEGER  NOT NULL CHECK (amount > 0),
    type        TEXT     NOT NULL,
    description TEXT DEFAULT '',
    date        DATETIME NOT NULL,
    userEmail   TEXT     NOT NULL,
    budgetId    TEXT     NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (userEmail) REFERENCES user (email),
    FOREIGN KEY (budgetId) REFERENCES budget (id)
);