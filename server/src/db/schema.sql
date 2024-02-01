CREATE TABLE IF NOT EXISTS user
(
    id       TEXT NOT NULL,
    email    TEXT NOT NULL,
    name     TEXT NOT NULL,
    password TEXT NOT NULL,

    PRIMARY KEY (email)
);
CREATE TABLE IF NOT EXISTS expense
(
    id          TEXT     NOT NULL,
    amount      INTEGER  NOT NULL CHECK (amount > 0),
    type        TEXT     NOT NULL,
    description TEXT DEFAULT '',
    date        DATETIME NOT NULL,
    email       TEXT     NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (email) REFERENCES user (email)
);