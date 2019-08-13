import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: 0
        };
    }

    componentDidMount() {
        let { count, limit } = this.props;
        const pages = Math.ceil(count / limit);
        this.setState({pages});
    }

    componentDidUpdate (prevProps) {
        if (prevProps.limit !== this.props.limit) {
            let { count, limit } = this.props;
            const pages = Math.ceil(count / limit);
            this.setState({pages});
        }
    }

    render () {
        let { id } = this.props.match.params.id;

        if (this.state.pages !== 0 && id > this.state.pages) {
            return <Redirect to={`/page/${this.state.pages}`} />
        }

        return (
            <div className="text-center">
                <nav aria-label="Page navigation example" style={{display: 'inline-block'}}>
                    <ul className="pagination">
                        {id === 1 ? (
                        <React.Fragment>
                            <li className="page-item active">
                                <div className="page-link" ria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">1</span>
                                </div>
                            </li>
                            <li className="page-item active">
                                <div className="page-link">←</div>
                            </li>
                        </React.Fragment>) : (
                        <React.Fragment>
                            <Link to='/page/1'>
                            <li className="page-item">
                                <div className="page-link" ria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">1</span>
                                </div>
                            </li>
                            </Link>
                            <Link to={`/page/${id-1}`}>
                            <li className="page-item">
                                <div className="page-link">←</div>
                            </li>
                            </Link>
                        </React.Fragment>)} {id === this.state.pages ? (
                        <React.Fragment>
                            <li className="page-item active">
                                <div className="page-link">→</div>
                            </li>
                            <li className="page-item active">
                                <div className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">{this.state.pages}</span>
                                </div>
                            </li>
                        </React.Fragment>) : (
                        <React.Fragment>
                            <Link to={`/page/${id+1}`}>
                            <li className="page-item">
                                <div className="page-link">→</div>
                            </li>
                            </Link>
                            <Link to={`/page/${this.state.pages}`}>
                            <li className="page-item">
                                <div className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">{this.state.pages}</span>
                                </div>
                            </li>
                            </Link>
                        </React.Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(Pagination);