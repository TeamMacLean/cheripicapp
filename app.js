const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();
const config = require('./config.json');
const uuid = require('uuid');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
    dest: config.tmpDir
}));

app.get('/', function (req, res, next) {
    res.render('index');
});

app.post('/submit', function (req, res, next) {
    // console.log(req.body);
    // console.log(req.files);

    var command = `${path.resolve(config.cheripic)}`;

    var data = req.body;
    var files = req.files;

    if (data.input_format) {
        command += ` -F ${data.input_format}`;
    }
    if (data.hmes_adjust) {
        command += ` --hmes-adjust=${data.hmes_adjust}`;
    }
    if (data.ht_low) {
        command += ` --htlow=${data.ht_low}`;
    }
    if (data.ht_high) {
        command += ` --hthigh=${data.ht_high}`;
    }
    if (data.min_depth) {
        command += ` --mindepth=${data.min_depth}`;
    }
    if (data.max_d_multiple) {
        command += ` --max-d-multiple=${data.max_d_multiple}`;
    }
    if (data.max_depth) {
        command += ` --maxdepth=${data.max_depth}`;
    }
    if (data.min_non_ref_count) {
        command += ` --min-non-ref-count=${data.min_non_ref_count}`;
    }
    if (data.min_indel_count_support) {
        command += ` --min-indel-count-support=${data.min_indel_count_support}`;
    }
    if (data.mapping_quality) {
        command += ` --mapping-quality=${data.mapping_quality}`;
    }
    if (data.base_quality) {
        command += ` --base-quality=${data.base_quality}`;
    }
    if (data.noise) {
        command += ` --noise=${data.noise}`;
    }
    if (data.cross_type) {
        command += ` --cross-type=${data.cross_type}`;
    }
    if (data.bfr_adjust) {
        command += ` --bfr-adjust=${data.bfr_adjust}`;
    }
    if (data.sel_seq_len) {
        command += ` --sel-seq-len=${data.sel_seq_len}`;
    }
    if (files.assembly) {
        command += ` -f ${path.resolve(files.assembly.path)}`;
    }
    if (files.mut_bulk) {
        command += ` --mut-bulk ${path.resolve(files.mut_bulk.path)}`;
    }
    if (files.bg_bulk) {
        command += ` --bg-bulk ${path.resolve(files.bg_bulk.path)}`;
    }
    // if (files.mut_bulk_vcf) {
    //     command += ` -f ${path.resolve(files.mut_bulk_vcf.path)}`;
    // }
    // if (files.bg_bulk_vcf) {
    //     command += ` -f ${path.resolve(files.bg_bulk_vcf.path)}`;
    // }
    if (files.mut_parent) {
        command += ` mut-parent ${path.resolve(files.mut_parent.path)}`;
    }
    if (files.bg_parent) {
        command += ` bg-parent ${path.resolve(files.bg_parent.path)}`;
    }
    // if (files.repeats_file) {
    //     command += ` -f ${path.resolve(files.repeats_file.path)}`;
    // }

    var exec = require("child_process").exec;
    var timestamp = uuid.v1();

    var dir = path.resolve(`tmp/${timestamp}`);

    fs.mkdir(dir, function (err) {
        if (err) {
            return res.send(err);
        }
        exec(command, {
            cwd: dir
        }, function (err, stdout, stderr) {
            if (err || stderr) {
                return res.send({err, stderr, stdout});
            } else {
                return res.sendFile(path.join(dir, config.outputFilename));
            }
        });
    });
});

module.exports = app;