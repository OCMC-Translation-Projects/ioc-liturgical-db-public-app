import React from 'react';
import Form from 'react-jsonschema-form';

export class DocLinks extends React.Component {

  data = {
    uiSchema: {
      "referredByText": {"ui:widget": "textarea"},
      "referredToText": {"ui:widget": "textarea"},
      "bibMaterial": {"ui:widget": "textarea"},
      "exenote": {"ui:widget": "textarea"},
      "lexnote": {"ui:widget": "textarea"},
      "targetedTerms": {"ui:widget": "textarea"},
      "textWitness": {"ui:widget": "textarea"},
      "multipleChoicesList": {
        "ui:widget": "checkboxes"
      },
      "ui:order": ["idReferredByText", "referredByText", "idReferredToText", "referredToText", "bibMaterial", "exenote", "lexnote", "targetedTerms", "textWitness", "multipleChoicesList"]
    }
    ,
    schema: {
      "type": "object",
      "description": "A reference is a doc that records information about a reference made in a text to something else.  For example, a liturgical text might be a hymn that refers to a person, place, or event, e.g. in the Bible.",
      "title": "Reference",
      "properties": {
        "bibMaterial": {
          "type": "string",
          "description": "Biblical Material (Theme < Figures, Hints, etc)."
        },
        "exenote": {"type": "string", "description": "Exegetical notes"},
        "idReferredByText": {
          "type": "string",
          "description": "The database ID of the doc containing the text that makes a reference to another text."
        },
        "referredByText": {
          "type": "string",
          "description": "The text that makes a reference to another text."
        },
        "idReferredToText": {
          "type": "string",
          "description": "The database ID of the doc containing the text that is referred to by another text."
        },
        "referredToText": {
          "type": "string",
          "description": "The text that is referred to by another text."
        },
        "lexnote": {"type": "string", "description": "Lexical notes"},
        "targetedTerms": {"type": "string", "description": "Targeted terms"},
        "textWitness": {"type": "string", "description": "Text witness"},
        "multipleChoicesList": {
          "type": "array",
          "title": "Sense(s).  These will become labels in the database.",
          "items": {
            "type": "string",
            "enum": [
              "Plain",
              "Plenior",
              "Allegory",
              "Trinitarian",
              "Christological",
              "Mariological",
              "Ecclesiastical",
              "Moral",
              "Spiritual",
              "Existential"
            ]
          },
          "uniqueItems": true
        }
      },
      "required": ["bibMaterial", "exenote", "idReferredByText", "idReferredToText", "lexnote", "targetedTerms", "textWitness"],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
    ,
    data: {
      "idReferredByText": "gr_gr_cog~me.m01.d01~meVE.Stichera01.text",
      "referredByText": "Συγκαταβαίνων ὁ Σωτήρ, τῷ γένει τῶν ἀνθρώπων, κατεδέξατο σπαργάνων περιβολήν, οὐκ ἐβδελύξατο σαρκὸς τὴν περιτομήν, ὁ ὀκταήμερος κατὰ τὴν Μητέρα, ὁ ἄναρχος κατὰ τὸν Πατέρα. Αὐτῷ πιστοὶ βοήσωμεν. Σὺ εἶ ὁ Θεὸς ἡμῶν, ἐλέησον ἡμᾶς.",
      "idReferredToText": "gr_gr_ntpt~LUK~C02:07",
      "referredToText": "Καὶ ἔτεκεν τὸν υἱὸν αὐτῆς τὸν πρωτότοκον, καὶ ἐσπαργάνωσεν αὐτόν, καὶ ἀνέκλινεν αὐτὸν ἐν τῇ φάτνῃ, διότι οὐκ ἦν αὐτοῖς τόπος ἐν τῷ καταλύματι",
      "bibMaterial": "",
      "exenote": "",
      "lexnote": "",
      "targetedTerms": "",
      "textWitness": "",
      "multipleChoicesList": []
    }

  };


  render() {
    return (
        <div className="App-references">
          <div>Below is a (non-working) sample of a form for create a reference doc.  It is provided for discussion purposes.</div>
          <Form schema={this.data.schema}
                uiSchema={this.data.uiSchema}
                formData={this.data.data}/>
        </div>
    )
  }
}

export default DocLinks;
