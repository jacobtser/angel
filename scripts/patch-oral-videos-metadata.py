import json, re, pathlib
p = pathlib.Path('content/oral-videos.ts')
text = p.read_text(encoding='utf-8')
sizes = {x['Name'].replace('.mp4',''): x['Length'] for x in json.loads(r'''[{"Name":"0fdivvUXRVk.mp4","MB":10.13,"Length":10626835},{"Name":"1rU-pNCEf8I.mp4","MB":30.66,"Length":32145612},{"Name":"4W64lhDgmZE.mp4","MB":37.91,"Length":39754115},{"Name":"7n0saw-2LsQ.mp4","MB":12.9,"Length":13527471},{"Name":"8UfgD2HYSDg.mp4","MB":57.2,"Length":59977668},{"Name":"8X7wRwqpM20.mp4","MB":7.87,"Length":8254516},{"Name":"9aqFAjEzgek.mp4","MB":10.46,"Length":10964407},{"Name":"9XsgtFsvIC0.mp4","MB":16.57,"Length":17375399},{"Name":"aFJUMZo0Fw8.mp4","MB":12.06,"Length":12640847},{"Name":"alXVP6yqnO0.mp4","MB":10.07,"Length":10562363},{"Name":"h93GQk0TW5A.mp4","MB":38.36,"Length":40220078},{"Name":"JV9yoo_Kd-k.mp4","MB":5.68,"Length":5958610},{"Name":"k-PzjAcOU-8.mp4","MB":57.29,"Length":60076038},{"Name":"KQ0vbsB9hnw.mp4","MB":8.04,"Length":8431296},{"Name":"kt9K2luWbm4.mp4","MB":7.49,"Length":7853638},{"Name":"KWuLshomp-o.mp4","MB":12.13,"Length":12719016},{"Name":"moCBpvgi2P0.mp4","MB":8.65,"Length":9073680},{"Name":"Pnc3OUGufRk.mp4","MB":58.17,"Length":60998072},{"Name":"Q4uJ4-AUoHg.mp4","MB":34.8,"Length":36488335},{"Name":"qQrYiY7JG14.mp4","MB":34.98,"Length":36675820},{"Name":"t7nRLtOxL2Y.mp4","MB":12.17,"Length":12763093},{"Name":"t_CVDSESnnw.mp4","MB":6.99,"Length":7332136},{"Name":"yRPMrvTfOV0.mp4","MB":28.07,"Length":29438077},{"Name":"YSBTxPBPlgg.mp4","MB":6.92,"Length":7251841},{"Name":"_IODAH2c5OQ.mp4","MB":18.88,"Length":19795523},{"Name":"_KRFrbUHKrg.mp4","MB":6.97,"Length":7311676}]''')}
meta = {
 'kt9K2luWbm4': {'tests':[5,6],'skills':['general']},
 '_IODAH2c5OQ': {'tests':[1,2,3,4],'skills':['general']},
 '7n0saw-2LsQ': {'tests':[1,2,3,4],'skills':['general']},
 'alXVP6yqnO0': {'tests':[1,2,3,4],'skills':['general']},
 'KWuLshomp-o': {'tests':[1,2,3,4],'skills':['general']},
 '8X7wRwqpM20': {'tests':[5,6],'skills':['general']},
 'aFJUMZo0Fw8': {'tests':[7,8],'skills':['general']},
 '9aqFAjEzgek': {'tests':[1,2,3,4],'skills':['general']},
 't_CVDSESnnw': {'tests':[1,2],'skills':['general']},
 'h93GQk0TW5A': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
 'Q4uJ4-AUoHg': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
 '4W64lhDgmZE': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
 '_KRFrbUHKrg': {'tests':[4],'skills':['general']},
 '1rU-pNCEf8I': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
 'JV9yoo_Kd-k': {'tests':[5],'skills':['rhymes','vowels']},
 'moCBpvgi2P0': {'tests':[6],'skills':['general']},
 'KQ0vbsB9hnw': {'tests':[7],'skills':['general']},
 'yRPMrvTfOV0': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
 'qQrYiY7JG14': {'tests':[1,2,3,4,5,6,7],'skills':['general']},
 '8UfgD2HYSDg': {'tests':[1,2,3,4],'skills':['general']},
 'k-PzjAcOU-8': {'tests':[5,6,7,8],'skills':['general']},
 't7nRLtOxL2Y': {'tests':[1,2,3],'skills':['general']},
 'YSBTxPBPlgg': {'tests':[4],'skills':['general']},
 '0fdivvUXRVk': {'tests':[6],'skills':['general']},
 '9XsgtFsvIC0': {'tests':[8],'skills':['general']},
 'Pnc3OUGufRk': {'tests':[1,2,3,4,5,6,7,8],'skills':['general']},
}

def repl(m):
    block = m.group(0)
    yid = re.search(r"youtubeId: '([^']+)'", block).group(1)
    if 'sourceUrl:' not in block:
        block = block.replace("youtubeId: '" + yid + "',", "youtubeId: '" + yid + "',\n    sourceUrl: 'https://www.youtube.com/watch?v=" + yid + "',", 1)
    if 'bytes:' not in block and yid in sizes:
        dur = re.search(r'duration: (\d+),', block).group(1)
        block = block.replace('duration: ' + dur + ',', 'duration: ' + dur + ',\n    bytes: ' + str(sizes[yid]) + ',', 1)
    if 'skills:' not in block and yid in meta:
        tests = json.dumps(meta[yid]['tests'])
        skills = json.dumps(meta[yid]['skills']).replace('"', "'")
        block = block[:-4] + "    tests: " + tests + ",\n    skills: " + skills + ",\n  " + block[-4:]
    return block

out = re.sub(r"\{\n    id: 'oralvid-[^']+'.*?\n  \},", repl, text, flags=re.S)
p.write_text(out, encoding='utf-8')
print('ok')
