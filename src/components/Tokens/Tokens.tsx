import './tokens.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'

const Tokens = () => {
    return (
        <div className="container-sm tokens-container">
            <div className="tokens-title">Top tokens on Ramenswap</div>
            <div className="filter-section">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Ethereum
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>A</Dropdown.Item>
                        <Dropdown.Item>B</Dropdown.Item>
                        <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        1D
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>A</Dropdown.Item>
                        <Dropdown.Item>B</Dropdown.Item>
                        <Dropdown.Item>C</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input type="text" placeholder="Filter Tokens" />
            </div>
            <Table className="tokens-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Token name</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>TVL</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                        <td>Example</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Tokens
