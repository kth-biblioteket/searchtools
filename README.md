# React app för att söka i KTH documents

##

### `npm run build`

### Server path "mrbs" (kontrollera vid build)
#### package.json

    "homepage": "/xxxx/",

#### navbar

    <Nav variant="" activeKey="/xxxx">
        <Nav.Item>
            <Nav.Link as={NavLink} to="/xxxx">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to="/xxxx/kthemployees">KTH Anställda(historik)</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to="/xxxx/hr">KTH HR</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={NavLink} to="/xxxx/ugusers">KTH Användare(UG)</Nav.Link>
        </Nav.Item>
    </Nav>

#### app.js

    <Routes>
        <Route path="/xxxx" element={<Home />} />
        <Route path="xxxx/kthemployees" element={<Kthemployees />} />
        <Route path="xxxx/hr" element={<Hr />} />
        <Route path="xxxx/ugusers" element={<Ugusers />} />
    </Routes>

## Copy till search.lib.kth.se från git bash
scp -P 8967 -r ../build/* kthb@lib.kth.se:/var/www/search.lib.kth.se/html


