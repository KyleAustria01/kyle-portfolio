# -*- coding: utf-8 -*-
"""Generates a modern, two-column PDF resume matching the kyle-portfolio site's
terminal aesthetic (dark sidebar, green accent, monospace headers)."""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

PAGE_W, PAGE_H = LETTER
SIDEBAR_W = 72 * mm

BG_DARK = HexColor('#0a0a0a')
GREEN = HexColor('#1f9d5c')      # print-safe accent (site green is #128050/#2fe08a)
GREEN_BRIGHT = HexColor('#2fe08a')
INK = HexColor('#111111')
GRAY = HexColor('#4b4b4b')
LIGHT_GRAY = HexColor('#8a8a8a')
WHITE = HexColor('#ffffff')
SIDE_TEXT = HexColor('#d8d8d8')
SIDE_MUTED = HexColor('#8f8f8f')
RULE = HexColor('#e2e2e2')

MONO = 'Courier'
MONO_B = 'Courier-Bold'
SANS = 'Helvetica'
SANS_B = 'Helvetica-Bold'
SANS_O = 'Helvetica-Oblique'

c = canvas.Canvas('Kyle-Ryan-Austria-Resume.pdf', pagesize=LETTER)


def wrap(text, font, size, max_width):
    words = text.split()
    lines, cur = [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if stringWidth(trial, font, size) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def bullet_block(x, y, text, max_width, font=SANS, size=8.6, leading=11.6,
                  color=INK, bullet='-', bullet_color=None, bullet_font=None):
    bullet_color = bullet_color or color
    bullet_font = bullet_font or font
    indent = 9
    lines = wrap(text, font, size, max_width - indent)
    c.setFont(bullet_font, size)
    c.setFillColor(bullet_color)
    c.drawString(x, y, bullet)
    c.setFont(font, size)
    c.setFillColor(color)
    for i, line in enumerate(lines):
        c.drawString(x + indent, y - i * leading, line)
    return y - (len(lines) - 1) * leading - leading


# ---------------------------------------------------------------- SIDEBAR --
def draw_sidebar():
    c.setFillColor(BG_DARK)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, stroke=0, fill=1)

    pad = 8 * mm
    x = pad
    w = SIDEBAR_W - 2 * pad
    y = PAGE_H - 16 * mm

    # Prompt-style eyebrow
    c.setFont(MONO, 8.5)
    c.setFillColor(GREEN_BRIGHT)
    c.drawString(x, y, '~/kyle-austria $ whoami')
    y -= 15

    c.setFont(SANS_B, 15.5)
    c.setFillColor(WHITE)
    c.drawString(x, y, 'Kyle Ryan')
    y -= 17
    c.drawString(x, y, 'Austria')
    y -= 20

    c.setFont(MONO, 9)
    c.setFillColor(GREEN_BRIGHT)
    c.drawString(x, y, 'Full Stack Developer')
    y -= 22

    # divider
    c.setStrokeColor(HexColor('#2a2a2a'))
    c.setLineWidth(0.6)
    c.line(x, y, x + w, y)
    y -= 16

    # --- Contact ---
    y = side_heading('CONTACT', x, y)
    contact_items = [
        'kyleryanaustria@gmail.com',
        '+63 976 272 2124',
        'Pampanga, Philippines',
        'linkedin.com/in/kyle-austria',
        'github.com/KyleAustria01',
        'kyleaustria01.github.io',
        '/kyle-portfolio',
    ]
    c.setFont(SANS, 8)
    c.setFillColor(SIDE_TEXT)
    for item in contact_items:
        for line in wrap(item, SANS, 8, w):
            c.drawString(x, y, line)
            y -= 10.6
    y -= 8

    # --- Skills ---
    y = side_heading('SKILLS', x, y)
    skill_groups = [
        ('Frontend', 'Angular, React, TypeScript, NgRx, RxJS, Vite, Tailwind CSS'),
        ('Backend', 'Laravel, PHP, NestJS, Node.js, Python, FastAPI, Prisma'),
        ('AI & Retrieval', 'RAG pipelines, Pinecone, Elasticsearch, LLM integration, AWS Bedrock'),
        ('Cloud & Data', 'AWS EC2/ECS/RDS/S3/SQS, Route 53, MySQL, PostgreSQL, Redis'),
        ('Tooling', 'Docker, Git, GitHub Actions, CI/CD, Nginx, Airtable, Zoho, Jira'),
    ]
    for label, items in skill_groups:
        c.setFont(SANS_B, 7.6)
        c.setFillColor(GREEN_BRIGHT)
        c.drawString(x, y, label.upper())
        y -= 10.5
        c.setFont(SANS, 7.8)
        c.setFillColor(SIDE_TEXT)
        for line in wrap(items, SANS, 7.8, w):
            c.drawString(x, y, line)
            y -= 10
        y -= 5
    y -= 3

    # --- Education ---
    y = side_heading('EDUCATION', x, y)
    c.setFont(SANS_B, 8.2)
    c.setFillColor(WHITE)
    for line in wrap('BS in Information Technology', SANS_B, 8.2, w):
        c.drawString(x, y, line)
        y -= 10.8
    c.setFont(SANS, 7.8)
    c.setFillColor(SIDE_TEXT)
    for line in wrap('University of the Assumption', SANS, 7.8, w):
        c.drawString(x, y, line)
        y -= 10
    c.setFillColor(SIDE_MUTED)
    c.drawString(x, y, '2019 - 2023')
    y -= 10
    c.setFillColor(GREEN_BRIGHT)
    c.drawString(x, y, "Dean's Lister (2022)")
    y -= 18

    # --- Languages / footer note ---
    y = side_heading('AVAILABILITY', x, y)
    c.setFont(SANS, 7.8)
    c.setFillColor(SIDE_TEXT)
    for line in ['Open to full-time &', 'contract work, remote', '(GMT+8)']:
        c.drawString(x, y, line)
        y -= 10


def side_heading(label, x, y):
    c.setFont(MONO_B, 8.8)
    c.setFillColor(GREEN_BRIGHT)
    c.drawString(x, y, '# ' + label)
    return y - 13


# ------------------------------------------------------------- MAIN COLUMN --
def draw_main():
    pad_l = SIDEBAR_W + 10 * mm
    pad_r = 12 * mm
    x = pad_l
    w = PAGE_W - pad_l - pad_r
    y = PAGE_H - 15 * mm

    y = section_title('SUMMARY', '01', x, y, w)
    summary = ("Full Stack Developer with 4+ years of experience building enterprise "
               "platforms in production, specializing in Angular on the front end and "
               "Laravel on the back end, with deep AWS experience. Built the internal "
               "CRM and operations platform Clark Outsourcing runs on -- employee "
               "lifecycle, helpdesk ticketing, and Airtable/Zoho automation -- plus a "
               "separate payroll system with full Philippine statutory compliance. "
               "Currently integrating AI into company workflows through RAG pipelines "
               "with Pinecone and Elasticsearch. Full details, live projects, and an "
               "AI assistant that answers questions about my work are on my portfolio "
               "site (see sidebar).")
    c.setFont(SANS, 9.4)
    c.setFillColor(GRAY)
    lines = wrap(summary, SANS, 9.4, w)
    for line in lines:
        c.drawString(x, y, line)
        y -= 13.2
    y -= 14

    y = section_title('EXPERIENCE', '02', x, y, w)

    jobs = [
        {
            'role': 'Full Stack Developer',
            'org': 'Clark Outsourcing',
            'dates': 'May 2022 -- Present',
            'bullets': [
                'Built and maintain the internal CRM & operations platform -- employee lifecycle, helpdesk ticketing, and the Airtable/Zoho automation layer that ties them together',
                'Built a separate payroll system with full Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG), cutting processing time by 80% and manual work by 60%',
                'Architected AWS infrastructure across EC2, ECS, RDS, S3, SQS, Route 53, and Elastic Beanstalk, with CI/CD pipelines and a secured Git branching strategy',
                'Integrating AI into company processes -- RAG pipelines with Pinecone and Elasticsearch for retrieval over internal knowledge',
            ],
        },
        {
            'role': 'Full Stack Developer (Part-time)',
            'org': 'SOS Global -- Australia',
            'dates': 'Nov 2025 -- Feb 2026',
            'bullets': [
                'Delivered NeuroScreen, a developmental screening platform for Australian schools, within an agreed 3-month project timeline',
                'Built the platform with Angular on the front end and a Node.js/NestJS API backed by Prisma; role-based access with per-school data isolation',
                'Owned the AWS deployment pipeline in ap-southeast-2 (Sydney) -- EC2, security groups, load balancers -- to keep student data resident in Australia',
            ],
        },
        {
            'role': 'Associate Software Engineer (OJT)',
            'org': 'Cloud Staff',
            'dates': 'Jan 2022 -- Apr 2022',
            'bullets': [
                'Acquired working proficiency in Git, Angular, Laravel, and Postman',
                'Contributed to an internal web ticketing system and participated in code reviews',
            ],
        },
    ]

    for job in jobs:
        c.setFont(SANS_B, 10.3)
        c.setFillColor(INK)
        c.drawString(x, y, job['role'])
        c.setFont(MONO, 8)
        c.setFillColor(LIGHT_GRAY)
        dw = stringWidth(job['dates'], MONO, 8)
        c.drawString(x + w - dw, y + 1, job['dates'])
        y -= 12.5
        c.setFont(SANS_O, 9.2)
        c.setFillColor(GREEN)
        c.drawString(x, y, job['org'])
        y -= 14
        for b in job['bullets']:
            y = bullet_block(x, y, b, w, font=SANS, size=9, leading=12.4, bullet_color=GREEN) - 3
        y -= 12

    y = section_title('SELECTED PROJECTS', '03', x, y, w)

    projects = [
        {
            'title': 'BoardHelper',
            'meta': 'Live -- boardhelper.vercel.app',
            'bullets': [
                'Board-exam study platform: shareable libraries, in-browser PDF highlighting, and spaced-repetition flashcards',
                'React, Vite, TypeScript, Tailwind CSS, Python, Docker, PostgreSQL',
            ],
        },
        {
            'title': 'A.R.I.A -- AI Recruiter Interview Assistant',
            'meta': 'github.com/KyleAustria01/ARIA',
            'bullets': [
                'AI interviewer running live voice screening over WebSockets with real-time transcription and a scored verdict',
                'Multi-provider LLM fallback chain (Cerebras to Groq to AWS Bedrock to Gemini); Python, FastAPI, React, Redis, Docker',
            ],
        },
    ]

    for p in projects:
        c.setFont(SANS_B, 10)
        c.setFillColor(INK)
        c.drawString(x, y, p['title'])
        c.setFont(MONO, 7.6)
        c.setFillColor(LIGHT_GRAY)
        mw = stringWidth(p['meta'], MONO, 7.6)
        c.drawString(x + w - mw, y + 1, p['meta'])
        y -= 13.5
        for b in p['bullets']:
            y = bullet_block(x, y, b, w, size=9, leading=12.4, bullet_color=GREEN) - 3
        y -= 10

    return y


def section_title(label, num, x, y, w):
    c.setFont(MONO_B, 10)
    c.setFillColor(GREEN)
    c.drawString(x, y, num + '.')
    c.setFont(SANS_B, 10.5)
    c.setFillColor(INK)
    c.drawString(x + 20, y, label)
    y -= 5
    c.setStrokeColor(RULE)
    c.setLineWidth(0.8)
    c.line(x, y, x + w, y)
    return y - 13


draw_sidebar()
draw_main()

c.setTitle('Kyle Ryan Austria - Resume')
c.setAuthor('Kyle Ryan Austria')
c.save()
print('Resume generated.')
