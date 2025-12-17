// SQL Content - Part 3

document.addEventListener('DOMContentLoaded', function() {
    populateSQLBasics();
    populateSQLQueries();
    populateSQLJoins();
    populateSQLAggregation();
    populateSQLAdvanced();
    populateSQLExercises();
});

function populateSQLBasics() {
    const section = document.getElementById('sql-basics');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ SQL Database Basics</h2>
        <p class="section-subtitle">Creating databases, tables, and schema design</p>

        <div class="content-card">
            <h3>Database & Table Commands</h3>
            <div class="code-block"><pre><code>-- Create database (prefix with netid_)
CREATE DATABASE netid_dbname;

-- Show databases
SHOW DATABASES;

-- Use database
USE netid_dbname;

-- Show tables
SHOW TABLES;

-- Describe table structure
DESC tablename;
SHOW COLUMNS FROM tablename;
SHOW CREATE TABLE tablename;</code></pre></div>
        </div>

        <div class="content-card">
            <h3>CREATE TABLE Syntax</h3>
            <div class="code-block"><pre><code>CREATE TABLE tablename (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
    PRIMARY KEY (column),
    FOREIGN KEY (column) REFERENCES othertable(column)
);</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Common Data Types</h3>
            <table class="data-table">
                <tr><th>Type</th><th>Description</th><th>Example Use</th></tr>
                <tr><td><code>INT</code></td><td>Integer</td><td>id, count</td></tr>
                <tr><td><code>SMALLINT</code></td><td>Smaller integer</td><td>id (fewer rows)</td></tr>
                <tr><td><code>TINYINT</code></td><td>Very small int (0-255)</td><td>share, age</td></tr>
                <tr><td><code>YEAR</code></td><td>Year value</td><td>year</td></tr>
                <tr><td><code>DATE</code></td><td>Date (YYYY-MM-DD)</td><td>release_date</td></tr>
                <tr><td><code>TIME</code></td><td>Time (HH:MM:SS)</td><td>departure_time</td></tr>
                <tr><td><code>CHAR(n)</code></td><td>Fixed-length string</td><td>state code (2)</td></tr>
                <tr><td><code>VARCHAR(n)</code></td><td>Variable-length string</td><td>name, description</td></tr>
                <tr><td><code>DECIMAL(p,s)</code></td><td>Precise decimal</td><td>price (6,2)</td></tr>
                <tr><td><code>ENUM('a','b')</code></td><td>Enumerated values</td><td>gender, status</td></tr>
            </table>
        </div>

        <div class="content-card">
            <h3>Column Constraints</h3>
            <div class="code-block"><pre><code>NOT NULL           -- Must have a value
PRIMARY KEY        -- Unique identifier, auto-indexed
AUTO_INCREMENT     -- Auto-generate sequential values
UNIQUE             -- All values must be different
DEFAULT value      -- Default if not specified
CHECK (condition)  -- Validate values
FOREIGN KEY        -- Reference to another table</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Example: Create Tables with Foreign Keys</h3>
            <div class="code-block"><pre><code>CREATE TABLE yearcat (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    year YEAR NOT NULL,
    category CHAR(10) NOT NULL
);

CREATE TABLE laureate (
    fname VARCHAR(80) NOT NULL,
    lname VARCHAR(40),
    share TINYINT NOT NULL,
    year_cat_id SMALLINT NOT NULL,
    FOREIGN KEY (year_cat_id) REFERENCES yearcat(id)
);</code></pre></div>
        </div>

        <div class="content-card">
            <h3>ALTER TABLE</h3>
            <div class="code-block"><pre><code>-- Add column
ALTER TABLE tablename ADD COLUMN colname datatype;

-- Modify column
ALTER TABLE tablename MODIFY COLUMN colname newdatatype;

-- Drop column
ALTER TABLE tablename DROP COLUMN colname;</code></pre></div>
        </div>

        <div class="content-card">
            <h3>INSERT, UPDATE, DELETE</h3>
            <div class="code-block"><pre><code>-- Insert
INSERT INTO tablename (col1, col2) VALUES (val1, val2);
INSERT INTO tablename VALUES (val1, val2, val3);  -- all columns

-- Update
UPDATE tablename SET col1 = val1 WHERE condition;

-- Delete
DELETE FROM tablename WHERE condition;</code></pre></div>
            <div class="concept-box warning">
                <h4>⚠️ Foreign Key Constraint</h4>
                <p>Cannot delete rows that are referenced by foreign keys in other tables. Delete dependent rows first!</p>
            </div>
        </div>
    `;
}

function populateSQLQueries() {
    const section = document.getElementById('sql-queries');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ SELECT Queries</h2>
        <p class="section-subtitle">Basic query patterns and filtering</p>

        <div class="content-card">
            <h3>Basic SELECT</h3>
            <div class="code-block"><code><span class="comment">-- Select all columns</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> tablename;

<span class="comment">-- Select specific columns</span>
<span class="keyword">SELECT</span> col1, col2 <span class="keyword">FROM</span> tablename;

<span class="comment">-- With alias</span>
<span class="keyword">SELECT</span> col1 <span class="keyword">AS</span> <span class="string">'Column Name'</span> <span class="keyword">FROM</span> tablename;

<span class="comment">-- Distinct values</span>
<span class="keyword">SELECT DISTINCT</span>(column) <span class="keyword">FROM</span> tablename;
<span class="keyword">SELECT COUNT</span>(<span class="keyword">DISTINCT</span>(column)) <span class="keyword">FROM</span> tablename;</code></div>
        </div>

        <div class="content-card">
            <h3>WHERE Clause - Filtering</h3>
            <div class="code-block"><code><span class="comment">-- Basic comparison</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> year = <span class="number">2020</span>;
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> price > <span class="number">100</span>;
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> category != <span class="string">'Peace'</span>;

<span class="comment">-- AND, OR</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> year = <span class="number">2020</span> <span class="keyword">AND</span> category = <span class="string">'Physics'</span>;
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> year = <span class="number">2020</span> <span class="keyword">OR</span> year = <span class="number">2021</span>;

<span class="comment">-- BETWEEN (inclusive)</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> year <span class="keyword">BETWEEN</span> <span class="number">2016</span> <span class="keyword">AND</span> <span class="number">2020</span>;

<span class="comment">-- IN (set membership)</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> category <span class="keyword">IN</span> (<span class="string">'Physics'</span>, <span class="string">'Chemistry'</span>);

<span class="comment">-- NULL check</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> lname <span class="keyword">IS NULL</span>;
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">WHERE</span> lname <span class="keyword">IS NOT NULL</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>LIKE - Pattern Matching</h3>
            <div class="code-block"><code><span class="comment">-- % matches any sequence of characters</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> Class <span class="keyword">WHERE</span> CName <span class="keyword">LIKE</span> <span class="string">'CS%'</span>;      <span class="comment">-- starts with CS</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> Class <span class="keyword">WHERE</span> Time <span class="keyword">LIKE</span> <span class="string">'%Th%'</span>;    <span class="comment">-- contains Th</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> movie <span class="keyword">WHERE</span> title <span class="keyword">LIKE</span> <span class="string">'The%'</span>;  <span class="comment">-- starts with The</span>

<span class="comment">-- _ matches single character</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> Class <span class="keyword">WHERE</span> CName <span class="keyword">LIKE</span> <span class="string">'%3__'</span>;   <span class="comment">-- 300-level (3 + 2 chars)</span></code></div>
            <div class="concept-box">
                <h4>💡 Note</h4>
                <p>String comparisons in MySQL are <strong>case-insensitive</strong> by default.</p>
            </div>
        </div>

        <div class="content-card">
            <h3>LIMIT and OFFSET</h3>
            <div class="code-block"><code><span class="comment">-- First n rows</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">LIMIT</span> <span class="number">5</span>;

<span class="comment">-- Skip first m, get next n</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">LIMIT</span> <span class="number">5</span> <span class="keyword">OFFSET</span> <span class="number">10</span>;  <span class="comment">-- rows 11-15</span>

<span class="comment">-- Last 5 (need to know total or use offset)</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">LIMIT</span> <span class="number">5</span> <span class="keyword">OFFSET</span> <span class="number">1021</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>ORDER BY - Sorting</h3>
            <div class="code-block"><code><span class="comment">-- Ascending (default)</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">ORDER BY</span> year;
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">ORDER BY</span> year <span class="keyword">ASC</span>;

<span class="comment">-- Descending</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">ORDER BY</span> year <span class="keyword">DESC</span>;

<span class="comment">-- Multiple columns</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> table <span class="keyword">ORDER BY</span> year <span class="keyword">DESC</span>, category <span class="keyword">ASC</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>Date Functions</h3>
            <div class="code-block"><code><span class="comment">-- Extract year from date</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> movie <span class="keyword">WHERE YEAR</span>(release_date) = <span class="number">2015</span>;

<span class="comment">-- Or use LIKE</span>
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> movie <span class="keyword">WHERE</span> release_date <span class="keyword">LIKE</span> <span class="string">'2015%'</span>;

<span class="comment">-- Current date</span>
<span class="keyword">SELECT</span> * <span class="keyword">WHERE</span> departure_date >= <span class="keyword">CURRENT_DATE</span>() - <span class="number">5</span>;</code></div>
        </div>
    `;
}

function populateSQLJoins() {
    const section = document.getElementById('sql-joins');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ JOINs & Relations</h2>
        <p class="section-subtitle">Combining data from multiple tables</p>

        <div class="content-card">
            <h3>Inner Join - Two Tables</h3>
            <div class="code-block"><code><span class="comment">-- Implicit join (comma syntax)</span>
<span class="keyword">SELECT</span> fname, lname, category 
<span class="keyword">FROM</span> laureate, yearcat 
<span class="keyword">WHERE</span> yearcat.year = <span class="number">2010</span> 
  <span class="keyword">AND</span> laureate.year_cat_id = yearcat.id;

<span class="comment">-- Explicit JOIN syntax</span>
<span class="keyword">SELECT</span> fname, lname, category
<span class="keyword">FROM</span> laureate
<span class="keyword">JOIN</span> yearcat <span class="keyword">ON</span> year_cat_id = id
<span class="keyword">WHERE</span> year = <span class="number">2010</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>Inner Join - Three Tables</h3>
            <div class="code-block"><code><span class="comment">-- Join all three tables</span>
<span class="keyword">SELECT DISTINCT</span>(motivation)
<span class="keyword">FROM</span> contribution C, yearcat Y, laureate L
<span class="keyword">WHERE</span> Y.year = <span class="number">2021</span> <span class="keyword">AND</span> Y.category = <span class="string">'Peace'</span>
  <span class="keyword">AND</span> Y.id = L.year_cat_id
  <span class="keyword">AND</span> C.id = L.motiv_id;</code></div>
            <div class="concept-box">
                <h4>💡 Table Aliases</h4>
                <p>Use single-letter aliases (C, Y, L) for cleaner queries. Qualify column names with table aliases when ambiguous (e.g., <code>Y.id</code>).</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Join Examples from College Database</h3>
            <div class="schema-box">
                <h4>Schema</h4>
                <p><code>Student(Id, Name, Major, Year, Age)</code><br>
                <code>Class(CName, Time, Room)</code><br>
                <code>Enrollment(SId, CName, Pos)</code><br>
                <code>HonorStudent(SId)</code></p>
            </div>
            <div class="code-block"><code><span class="comment">-- Students taking a specific class</span>
<span class="keyword">SELECT</span> S.Name 
<span class="keyword">FROM</span> Student S, Enrollment E 
<span class="keyword">WHERE</span> S.Id = E.SId <span class="keyword">AND</span> E.CName = <span class="string">'CS 210'</span>;

<span class="comment">-- Honor students' names</span>
<span class="keyword">SELECT</span> Name 
<span class="keyword">FROM</span> Student S, HonorStudent H 
<span class="keyword">WHERE</span> H.SId = S.Id;</code></div>
        </div>

        <div class="content-card">
            <h3>Nested SELECT (Subqueries)</h3>
            <div class="code-block"><code><span class="comment">-- Students older than Chen</span>
<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student 
<span class="keyword">WHERE</span> Age > (<span class="keyword">SELECT</span> Age <span class="keyword">FROM</span> Student <span class="keyword">WHERE</span> Name = <span class="string">'Chen'</span>);

<span class="comment">-- Students in honor program</span>
<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student 
<span class="keyword">WHERE</span> Id <span class="keyword">IN</span> (<span class="keyword">SELECT</span> SId <span class="keyword">FROM</span> HonorStudent);</code></div>
        </div>

        <div class="content-card">
            <h3>Set Operations</h3>
            <div class="code-block"><code><span class="comment">-- UNION (OR)</span>
(<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student <span class="keyword">WHERE</span> Year = <span class="string">'SO'</span>)
<span class="keyword">UNION</span>
(<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student S, HonorStudent H <span class="keyword">WHERE</span> H.SId = S.Id);

<span class="comment">-- INTERSECT (AND)</span>
(<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student <span class="keyword">WHERE</span> Year = <span class="string">'SR'</span>)
<span class="keyword">INTERSECT</span>
(<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student S, HonorStudent H <span class="keyword">WHERE</span> H.SId = S.Id);

<span class="comment">-- NOT IN (Difference)</span>
<span class="keyword">SELECT</span> Name <span class="keyword">FROM</span> Student 
<span class="keyword">WHERE</span> Year = <span class="string">'SR'</span> <span class="keyword">AND</span> Id <span class="keyword">NOT IN</span> (<span class="keyword">SELECT</span> SId <span class="keyword">FROM</span> HonorStudent);</code></div>
        </div>
    `;
}

function populateSQLAggregation() {
    const section = document.getElementById('sql-aggregation');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ Aggregation & GROUP BY</h2>
        <p class="section-subtitle">Aggregate functions and grouping results</p>

        <div class="content-card">
            <h3>Aggregate Functions</h3>
            <div class="code-block"><code><span class="keyword">SELECT COUNT</span>(*) <span class="keyword">FROM</span> table;           <span class="comment">-- count all rows</span>
<span class="keyword">SELECT COUNT</span>(column) <span class="keyword">FROM</span> table;      <span class="comment">-- count non-null</span>
<span class="keyword">SELECT COUNT</span>(<span class="keyword">DISTINCT</span> col) <span class="keyword">FROM</span> table; <span class="comment">-- count unique</span>

<span class="keyword">SELECT SUM</span>(column) <span class="keyword">FROM</span> table;
<span class="keyword">SELECT AVG</span>(column) <span class="keyword">FROM</span> table;
<span class="keyword">SELECT MAX</span>(column) <span class="keyword">FROM</span> table;
<span class="keyword">SELECT MIN</span>(column) <span class="keyword">FROM</span> table;

<span class="comment">-- Round average</span>
<span class="keyword">SELECT ROUND</span>(<span class="keyword">AVG</span>(rating), <span class="number">1</span>) <span class="keyword">FROM</span> rating;</code></div>
        </div>

        <div class="content-card">
            <h3>GROUP BY</h3>
            <div class="code-block"><code><span class="comment">-- Count per category</span>
<span class="keyword">SELECT</span> category, <span class="keyword">COUNT</span>(*) 
<span class="keyword">FROM</span> yearcat 
<span class="keyword">GROUP BY</span> category;

<span class="comment">-- Sum by year</span>
<span class="keyword">SELECT</span> year, <span class="keyword">SUM</span>(pop) 
<span class="keyword">FROM</span> popdf 
<span class="keyword">GROUP BY</span> year;

<span class="comment">-- Multiple grouping levels</span>
<span class="keyword">SELECT</span> Y.year, Y.category, <span class="keyword">COUNT</span>(*) <span class="keyword">AS</span> <span class="string">'laureates'</span>
<span class="keyword">FROM</span> yearcat Y, laureate L
<span class="keyword">WHERE</span> Y.year <span class="keyword">BETWEEN</span> <span class="number">2016</span> <span class="keyword">AND</span> <span class="number">2020</span> <span class="keyword">AND</span> Y.id = L.year_cat_id
<span class="keyword">GROUP BY</span> Y.year, Y.category;</code></div>
        </div>

        <div class="content-card">
            <h3>HAVING - Filter Groups</h3>
            <p>WHERE filters rows BEFORE grouping. HAVING filters groups AFTER.</p>
            <div class="code-block"><code><span class="comment">-- Years where Economics was shared by multiple winners</span>
<span class="keyword">SELECT</span> Y.year, <span class="keyword">COUNT</span>(*) <span class="keyword">AS</span> laureates
<span class="keyword">FROM</span> yearcat Y, laureate L
<span class="keyword">WHERE</span> Y.category = <span class="string">'Economics'</span> <span class="keyword">AND</span> Y.id = L.year_cat_id
<span class="keyword">GROUP BY</span> Y.year
<span class="keyword">HAVING COUNT</span>(*) > <span class="number">1</span>
<span class="keyword">ORDER BY COUNT</span>(*) <span class="keyword">DESC</span>, Y.year <span class="keyword">DESC</span>;</code></div>
            <div class="concept-box">
                <h4>💡 Query Order</h4>
                <p><code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code></p>
            </div>
        </div>

        <div class="content-card">
            <h3>Aggregation with ORDER BY</h3>
            <div class="code-block"><code><span class="comment">-- Top 5 highest rated movies of 2017</span>
<span class="keyword">SELECT</span> title, <span class="keyword">ROUND</span>(<span class="keyword">AVG</span>(rating), <span class="number">1</span>) <span class="keyword">AS</span> avgr
<span class="keyword">FROM</span> rating, movie
<span class="keyword">WHERE YEAR</span>(release_date) = <span class="number">2017</span> <span class="keyword">AND</span> movieid = id
<span class="keyword">GROUP BY</span> id
<span class="keyword">ORDER BY</span> avgr <span class="keyword">DESC</span>
<span class="keyword">LIMIT</span> <span class="number">5</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>Finding Min/Max</h3>
            <div class="code-block"><code><span class="comment">-- Youngest student(s)</span>
<span class="keyword">SELECT</span> Name, Id <span class="keyword">FROM</span> Student 
<span class="keyword">WHERE</span> Age <span class="keyword">IN</span> (<span class="keyword">SELECT MIN</span>(Age) <span class="keyword">FROM</span> Student);

<span class="comment">-- Or using <= ALL</span>
<span class="keyword">SELECT</span> Name, Id <span class="keyword">FROM</span> Student 
<span class="keyword">WHERE</span> Age <= <span class="keyword">ALL</span> (<span class="keyword">SELECT</span> Age <span class="keyword">FROM</span> Student);

<span class="comment">-- CS class(es) with least enrollment</span>
<span class="keyword">SELECT</span> CName <span class="keyword">FROM</span> Enrollment
<span class="keyword">WHERE</span> CName <span class="keyword">LIKE</span> <span class="string">'CS%'</span>
<span class="keyword">GROUP BY</span> CName
<span class="keyword">HAVING COUNT</span>(*) <= <span class="keyword">ALL</span> (
    <span class="keyword">SELECT COUNT</span>(*) <span class="keyword">FROM</span> Enrollment 
    <span class="keyword">WHERE</span> CName <span class="keyword">LIKE</span> <span class="string">'CS%'</span> 
    <span class="keyword">GROUP BY</span> CName
);</code></div>
            <div class="concept-box warning">
                <h4>⚠️ Important</h4>
                <p>Use <code>&lt;=</code> not <code>&lt;</code> with ALL for finding minimum! The min must equal at least one value.</p>
            </div>
        </div>
    `;
}

function populateSQLAdvanced() {
    const section = document.getElementById('sql-advanced');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ Advanced SQL Queries</h2>
        <p class="section-subtitle">Complex queries and patterns</p>

        <div class="content-card">
            <h3>EXISTS / NOT EXISTS</h3>
            <p>Test if a subquery returns any rows:</p>
            <div class="code-block"><code><span class="comment">-- Students taking ALL CS classes</span>
<span class="keyword">SELECT DISTINCT</span> E.SId 
<span class="keyword">FROM</span> Enrollment E
<span class="keyword">WHERE NOT EXISTS</span> (
    <span class="keyword">SELECT</span> CName <span class="keyword">FROM</span> Class <span class="keyword">WHERE</span> CName <span class="keyword">LIKE</span> <span class="string">'CS%'</span>
    <span class="keyword">AND</span> CName <span class="keyword">NOT IN</span> (
        <span class="keyword">SELECT</span> F.CName <span class="keyword">FROM</span> Enrollment F <span class="keyword">WHERE</span> F.SId = E.SId
    )
);</code></div>
            <div class="explanation">
                <div class="explanation-label">Strategy</div>
                <p>Find all CS classes, subtract CS classes taken by student. If nothing left (NOT EXISTS), student takes all.</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Complex Comparison Query</h3>
            <div class="code-block"><code><span class="comment">-- Movies with higher avg rating than 'Fly Me to the Moon'</span>
<span class="keyword">SELECT</span> title, <span class="keyword">AVG</span>(rating) <span class="keyword">AS</span> avg_rating
<span class="keyword">FROM</span> movie, rating, user
<span class="keyword">WHERE YEAR</span>(release_date) <span class="keyword">IN</span> (
    <span class="keyword">SELECT YEAR</span>(release_date) <span class="keyword">FROM</span> movie 
    <span class="keyword">WHERE</span> title = <span class="string">'Fly me to the moon'</span>
)
<span class="keyword">AND</span> userid = user.id <span class="keyword">AND</span> movieid = movie.id
<span class="keyword">GROUP BY</span> title
<span class="keyword">HAVING</span> avg_rating > (
    <span class="keyword">SELECT AVG</span>(rating) <span class="keyword">FROM</span> movie, user, rating
    <span class="keyword">WHERE</span> title = <span class="string">'Fly me to the moon'</span> 
    <span class="keyword">AND</span> userid = user.id <span class="keyword">AND</span> movieid = movie.id
)
<span class="keyword">ORDER BY</span> avg_rating <span class="keyword">DESC</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>Self-Join Pattern</h3>
            <p>Join table to itself (e.g., employee/supervisor):</p>
            <div class="code-block"><code><span class="comment">-- Names of supervisors (employees who supervise someone)</span>
<span class="keyword">SELECT DISTINCT</span> S.fname, S.lname
<span class="keyword">FROM</span> employee E, employee S
<span class="keyword">WHERE</span> E.superssn = S.ssn;

<span class="comment">-- Supervisors with > 2 supervisees</span>
<span class="keyword">SELECT</span> S.fname, S.lname
<span class="keyword">FROM</span> employee E, employee S
<span class="keyword">WHERE</span> E.superssn = S.ssn
<span class="keyword">GROUP BY</span> S.ssn
<span class="keyword">HAVING COUNT</span>(*) > <span class="number">2</span>;</code></div>
        </div>

        <div class="content-card">
            <h3>UPDATE with Calculation</h3>
            <div class="code-block"><code><span class="comment">-- Increase salary by 10% for department 2</span>
<span class="keyword">UPDATE</span> employee 
<span class="keyword">SET</span> salary = salary * <span class="number">1.1</span> 
<span class="keyword">WHERE</span> dno = <span class="number">2</span>;</code></div>
        </div>

        <div class="quick-ref">
            <h4>📋 SQL Query Building Blocks</h4>
            <div class="quick-ref-grid">
                <div class="quick-ref-item"><code>SELECT ... FROM</code></div>
                <div class="quick-ref-item"><code>WHERE condition</code></div>
                <div class="quick-ref-item"><code>JOIN ON</code></div>
                <div class="quick-ref-item"><code>GROUP BY col</code></div>
                <div class="quick-ref-item"><code>HAVING aggregate</code></div>
                <div class="quick-ref-item"><code>ORDER BY col</code></div>
                <div class="quick-ref-item"><code>LIMIT n</code></div>
                <div class="quick-ref-item"><code>IN (subquery)</code></div>
                <div class="quick-ref-item"><code>NOT EXISTS</code></div>
                <div class="quick-ref-item"><code><= ALL</code></div>
            </div>
        </div>
    `;
}

function populateSQLExercises() {
    const section = document.getElementById('sql-exercises');
    section.innerHTML = `
        <h2 class="section-title sql">🗄️ SQL Exercises</h2>
        <p class="section-subtitle">Practice queries from lectures and recitations - Practice ALL of these!</p>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">1</span>
                <span class="exercise-title">Laureates in 2010</span>
                <span class="exercise-source">Nov 18</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Who were the laureates in 2010, and for what category? (nobels database)</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-1">🔍 Reveal Answer</button>
                <div id="ans-sql-1" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT fname, lname, category
FROM laureate, yearcat
WHERE yearcat.year = 2010
  AND laureate.year_cat_id = yearcat.id;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">2</span>
                <span class="exercise-title">Peace Prize 2021 Contribution</span>
                <span class="exercise-source">Nov 20</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">For what contribution(s) was the Peace prize awarded in 2021?</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-2">🔍 Reveal Answer</button>
                <div id="ans-sql-2" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT DISTINCT(motivation)
FROM contribution C, yearcat Y, laureate L
WHERE Y.year = 2021 AND Y.category = 'Peace'
  AND Y.id = L.year_cat_id
  AND C.id = L.motiv_id;</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Join all three tables. Use DISTINCT because multiple laureates may share same motivation.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">3</span>
                <span class="exercise-title">Economics Shared Prize Years</span>
                <span class="exercise-source">Nov 20</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">2000-2023: List years when Economics prize was shared (>1 winner), ordered by count desc, then year desc.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-3">🔍 Reveal Answer</button>
                <div id="ans-sql-3" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT Y.year, COUNT(*) AS laureates
FROM yearcat Y, laureate L
WHERE Y.year BETWEEN 2000 AND 2023
  AND Y.category = 'Economics'
  AND Y.id = L.year_cat_id
GROUP BY Y.year
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC, Y.year DESC;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">4</span>
                <span class="exercise-title">CS Classes</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find all CS classes (college database)</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-4">🔍 Reveal Answer</button>
                <div id="ans-sql-4" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT * FROM Class WHERE CName LIKE 'CS%';</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">5</span>
                <span class="exercise-title">Students Older Than Chen</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find all students older than Chen</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-5">🔍 Reveal Answer</button>
                <div id="ans-sql-5" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT Name FROM Student 
WHERE Age > (SELECT Age FROM Student WHERE Name = 'Chen');</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">6</span>
                <span class="exercise-title">Senior Honor Students</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find names of senior honor students</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-6">🔍 Reveal Answer</button>
                <div id="ans-sql-6" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>-- Using INTERSECT
(SELECT Name FROM Student WHERE Year = 'SR')
INTERSECT
(SELECT Name FROM Student S, HonorStudent H WHERE H.SId = S.Id);

-- Using JOIN
SELECT Name FROM Student S, HonorStudent H 
WHERE Year = 'SR' AND S.Id = H.SId;

-- Using IN
SELECT Name FROM Student 
WHERE Year = 'SR' AND Id IN (SELECT SId FROM HonorStudent);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">7</span>
                <span class="exercise-title">Students Taking ALL CS Classes</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find names of students taking all CS classes</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-7">🔍 Reveal Answer</button>
                <div id="ans-sql-7" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT DISTINCT S.Name 
FROM Student S, Enrollment E
WHERE S.Id = E.SId AND NOT EXISTS (
    SELECT CName FROM Class WHERE CName LIKE 'CS%'
    AND CName NOT IN (
        SELECT F.CName FROM Enrollment F WHERE F.SId = E.SId
    )
);</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Strategy: (All CS classes) - (CS classes taken by student) = empty means student takes all.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">8</span>
                <span class="exercise-title">CS Class with Least Enrollment</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find CS class(es) with least enrollment</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-8">🔍 Reveal Answer</button>
                <div id="ans-sql-8" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT CName FROM Enrollment
WHERE CName LIKE 'CS%'
GROUP BY CName
HAVING COUNT(*) <= ALL (
    SELECT COUNT(*) FROM Enrollment
    WHERE CName LIKE 'CS%'
    GROUP BY CName
);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">9</span>
                <span class="exercise-title">Hospital Schema Design</span>
                <span class="exercise-source">PS12</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Design schema for: HOSPITAL (id, name, phone, address), DOCTOR (id, name, specialty, hospital), PATIENT (id, name, age, primary doctor, additional doctors)</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your CREATE TABLE statements here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-9">🔍 Reveal Answer</button>
                <div id="ans-sql-9" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_number CHAR(10) NOT NULL,
    street_address VARCHAR(50) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state_code CHAR(2) NOT NULL,
    zip CHAR(5) NOT NULL
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    specialty VARCHAR(50) NOT NULL,
    hospital_id INT NOT NULL,
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    age TINYINT NOT NULL,
    primary_doctor_id INT NOT NULL,
    FOREIGN KEY(primary_doctor_id) REFERENCES doctors(id)
);

CREATE TABLE patients_nonprimary_doctors (
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id)
);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">10</span>
                <span class="exercise-title">Company Schema Queries</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Schema: employee(ssn, fname, lname, dno, gender, salary, superssn)<br>
                List names of employees who supervise more than 2 employees</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-10">🔍 Reveal Answer</button>
                <div id="ans-sql-10" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT S.fname, S.lname
FROM employee E, employee S
WHERE E.superssn = S.ssn
GROUP BY S.ssn
HAVING COUNT(*) > 2;</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Self-join: E is supervisee, S is supervisor. Group by supervisor, count their supervisees.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">11</span>
                <span class="exercise-title">Employees Earning 10K-30K</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">List fname, lname, ssn of employees earning between 10000 and 30000 (inclusive).</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-11">🔍 Reveal Answer</button>
                <div id="ans-sql-11" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT fname, lname, ssn 
FROM employee 
WHERE salary BETWEEN 10000 AND 30000;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">12</span>
                <span class="exercise-title">Employee Count with Complex Condition</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Count employees in (dept 4 earning > 25000) OR (dept 5 earning > 30000)</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-12">🔍 Reveal Answer</button>
                <div id="ans-sql-12" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT COUNT(*) FROM employee 
WHERE (dno = 4 AND salary > 25000) 
   OR (dno = 5 AND salary > 30000);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">13</span>
                <span class="exercise-title">Top 10 Earners in Department</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">List fname, lname, salary, and dname of top 10 earners in department 3.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-13">🔍 Reveal Answer</button>
                <div id="ans-sql-13" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT E.fname, E.lname, E.salary, D.dname
FROM employee E, department D
WHERE E.dno = D.dno AND E.dno = 3
ORDER BY E.salary DESC
LIMIT 10;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">14</span>
                <span class="exercise-title">Department Statistics</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">For each department: count employees, max/min/avg/total salary, and dno.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-14">🔍 Reveal Answer</button>
                <div id="ans-sql-14" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT dno,
       COUNT(*) as num_employees,
       MAX(salary) as max_salary,
       MIN(salary) as min_salary,
       ROUND(AVG(salary), 2) as avg_salary,
       SUM(salary) as total_salary
FROM employee
GROUP BY dno;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">15</span>
                <span class="exercise-title">Employees Who Don't Supervise</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">List names of employees who do not supervise anyone.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-15">🔍 Reveal Answer</button>
                <div id="ans-sql-15" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT fname, lname FROM employee
WHERE ssn NOT IN (
    SELECT DISTINCT superssn FROM employee 
    WHERE superssn IS NOT NULL
);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">16</span>
                <span class="exercise-title">Female Supervisors</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">List the name and salary of all female supervisors.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-16">🔍 Reveal Answer</button>
                <div id="ans-sql-16" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT DISTINCT S.fname, S.lname, S.salary
FROM employee E, employee S
WHERE E.superssn = S.ssn AND S.gender = 'f';</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">17</span>
                <span class="exercise-title">UPDATE - Increase Salary</span>
                <span class="exercise-source">PS13</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Increase salary by 10% for employees in department 2.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-17">🔍 Reveal Answer</button>
                <div id="ans-sql-17" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>UPDATE employee 
SET salary = salary * 1.10 
WHERE dno = 2;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">18</span>
                <span class="exercise-title">Thursday Classes (LIKE)</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find all classes that meet on Thursday (College DB).</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-18">🔍 Reveal Answer</button>
                <div id="ans-sql-18" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT CName, Time FROM Class 
WHERE Time LIKE '%Th%';</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>% matches any string (0 or more chars). So '%Th%' finds Time values containing 'Th' anywhere.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">19</span>
                <span class="exercise-title">300-Level Classes (LIKE)</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find all 300-level classes.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-19">🔍 Reveal Answer</button>
                <div id="ans-sql-19" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT * FROM Class WHERE CName LIKE '%3__';</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>_ matches exactly one character. So '3__' matches 3 followed by exactly 2 characters (e.g., 311, 323).</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">20</span>
                <span class="exercise-title">Sophomores OR Honor Students (UNION)</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find names of students who are either sophomores OR honor students.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-20">🔍 Reveal Answer</button>
                <div id="ans-sql-20" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>(SELECT Name FROM Student WHERE Year='SO')
UNION
(SELECT Name FROM Student S, HonorStudent H WHERE H.SId = S.Id);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">21</span>
                <span class="exercise-title">Seniors NOT Honor Students</span>
                <span class="exercise-source">Dec 2</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find names of seniors who are NOT honor students.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-21">🔍 Reveal Answer</button>
                <div id="ans-sql-21" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT Name FROM Student
WHERE Year = 'SR' AND Id NOT IN 
    (SELECT SId FROM HonorStudent);</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>MySQL has no EXCEPT/DIFFERENCE operator. Use NOT IN subquery instead.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">22</span>
                <span class="exercise-title">Average Age by Year</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find the average student age by year.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-22">🔍 Reveal Answer</button>
                <div id="ans-sql-22" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT Year, AVG(Age) FROM Student GROUP BY Year;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">23</span>
                <span class="exercise-title">Enrollment Counts (Sorted)</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Get enrollment counts for classes, highest to lowest.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-23">🔍 Reveal Answer</button>
                <div id="ans-sql-23" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT CName, COUNT(*) as Enrollment 
FROM Enrollment 
GROUP BY CName 
ORDER BY COUNT(*) DESC;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">24</span>
                <span class="exercise-title">Classes with 2+ Students</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Get enrollment counts for classes that have at least 2 students.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-24">🔍 Reveal Answer</button>
                <div id="ans-sql-24" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT CName, COUNT(*) as Enrollment 
FROM Enrollment 
GROUP BY CName 
HAVING COUNT(*) >= 2;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">25</span>
                <span class="exercise-title">Youngest Student(s)</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find the name and id of the youngest student(s).</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-25">🔍 Reveal Answer</button>
                <div id="ans-sql-25" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>-- Using MIN in subquery
SELECT Name, Id FROM Student 
WHERE Age IN (SELECT MIN(Age) FROM Student);

-- Using <= ALL
SELECT Name, Id FROM Student
WHERE Age <= ALL (SELECT Age FROM Student);</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Use &lt;= (not &lt;) because minimum must match at least one value.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">26</span>
                <span class="exercise-title">Movies Released in 2015</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">How many movies were released in 2015? (Movies DB)</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-26">🔍 Reveal Answer</button>
                <div id="ans-sql-26" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT COUNT(*) FROM movie 
WHERE YEAR(release_date) = 2015;

-- Alternative using LIKE
SELECT COUNT(*) FROM movie 
WHERE release_date LIKE '2015%';</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">27</span>
                <span class="exercise-title">Top 5 Rated Movies of 2017</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">What were the 5 highest rated movies of 2017, and their average user rating?</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-27">🔍 Reveal Answer</button>
                <div id="ans-sql-27" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT title, ROUND(AVG(rating), 1) as avgr
FROM rating, movie 
WHERE YEAR(release_date) = 2017 AND movieid = id
GROUP BY id
ORDER BY avgr DESC
LIMIT 5;</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">28</span>
                <span class="exercise-title">Releases Per Year 2015-2024</span>
                <span class="exercise-source">Dec 4</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">How many movies were released in each of the years 2015 to 2024?</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your SQL query here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-sql-28">🔍 Reveal Answer</button>
                <div id="ans-sql-28" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>SELECT YEAR(release_date) as year, COUNT(*) as releases
FROM movie
WHERE YEAR(release_date) BETWEEN 2015 AND 2024
GROUP BY YEAR(release_date);</code></pre></div>
                </div>
            </div>
        </div>

        <div class="concept-box success">
            <h4>✓ SQL Practice Tip</h4>
            <p>There are 28+ exercises above covering all major SQL patterns. Make sure you can write variations of each. Practice until you can write them without looking at the answers!</p>
        </div>
    `;
}

