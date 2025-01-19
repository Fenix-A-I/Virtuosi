

CREATE TABLE virtues (
    habitName VARCHAR NOT NULL,
    habitIsVirtue BOOLEAN NOT NULL,
    habitDescription VARCHAR,
    habitTrackingType VARCHAR NOT NULL,
    goalDayRequirement VARCHAR NOT NULL,
    goalDaycountCount INT,
    goalDaycountPeriod VARCHAR(4,5),
    goalWeekdaysDays VARCHAR,
    goalStreakCheat VARCHAR,
    goalStreakSkipsDays int,
    goalStreakFreezesAccumulation int,
    cur_streak int
);

CREATE TABLE history (
    habitName VARCHAR NOT NULL,
    habitIsVirtue BOOLEAN NOT NULL,
    habitTrackingType NOT NULL,
    goalDayRequirement NOT NULL,
    count int,
    completed BOOLEAN,
    timeperiod decimal(10,2),
    dayRecorded date,
);