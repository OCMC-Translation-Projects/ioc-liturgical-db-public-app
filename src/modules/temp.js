{this.state.showIdPartSelector &&
<div className="row">
  <div className="col-sm-12 col-md-12 col-lg-12">
    <div className="control-label">Selected ID: {this.state.selectedId} </div>
    <div className="control-label">You can search by ID parts:</div>
    <IdQuerySelector items={this.state.selectedIdParts} handleSelection={this.handleIdQuerySelection}/>
  </div>
</div>
}
