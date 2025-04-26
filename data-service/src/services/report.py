
import os

from datetime import timedelta
from uuid import uuid4

from repositories.data import DataRepository
from repositories.report import ReportRepository
from schemes.data import FoundData
from schemes.report import GenerateRequest

import matplotlib.pyplot as plt

from matplotlib.backends.backend_pdf import PdfPages


class ReportService:
    def __init__(self, report_repo: ReportRepository, data_repo: DataRepository):
        self.report_repo = report_repo
        self.data_repo = data_repo

    async def plot(self,
        req: GenerateRequest,
        pdf,
        tablename,
        parameter,
        rng,
        target,
        title,
        legend,
        xlabel,
        ylabel,
    ):
        print(tablename, parameter)
        plt.figure(figsize=(10, 6))
        plt.xlim((req.timefrom, req.timeto))
        for pos in range(1, rng + 1):
            result: list[FoundData] = (await self.data_repo.get_min_max_grouped(
                tablename,
                parameter,
                req.grouping,
                req.timefrom - timedelta(hours=3),
                req.timeto - timedelta(hours=3),
                pos,
                target,
            ))
            dates = []
            values = []
            for record in result:
                dates.append(record.timestamp + timedelta(hours=3))
                values.append(record.value)
            plt.plot(dates, values, marker='o', linestyle='-', label='Записанные значения')
        plt.title(title, fontsize=16)
        plt.legend([f'{legend} {i + 1}' for i in range(rng)], ncol=max(rng // 16, 1))
        plt.xlabel(xlabel, fontsize=12)
        plt.ylabel(ylabel, fontsize=12)
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        pdf.savefig()
        plt.close()

    async def plot_grsch(self, req, pdf):
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры ГРЩ', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename='GRSCH',
            parameter='voltage',
            rng=2,
            target=400,
            title='Напряжение',
            legend='ГРЩ',
            xlabel='Время',
            ylabel='Напряжение, В'
        )
        await self.plot(
            req,
            pdf,
            tablename='GRSCH',
            parameter='activePower',
            rng=2,
            target=700,
            title='Активная мощность',
            legend='ГРЩ',
            xlabel='Время',
            ylabel='Мощность, кВт',
        )
        await self.plot(
            req,
            pdf,
            tablename='GRSCH',
            parameter='coefficient',
            rng=2,
            target=1,
            title='Коэффициент мощности',
            legend='ГРЩ',
            xlabel='Время',
            ylabel='Коэффициент',
        )

    async def plot_dgu(self, req, pdf):
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры ДГУ', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename='DGU',
            parameter='voltage',
            rng=2,
            target=400,
            title='Напряжение',
            legend='ДГУ',
            xlabel='Время',
            ylabel='Напряжение, В'
        )
        await self.plot(
            req,
            pdf,
            tablename='DGU',
            parameter='activePower',
            rng=2,
            target=700,
            title='Активная мощность',
            legend='ДГУ',
            xlabel='Время',
            ylabel='Мощность, кВт',
        )
        await self.plot(
            req,
            pdf,
            tablename='DGU',
            parameter='coefficient',
            rng=2,
            target=1,
            title='Коэффициент мощности',
            legend='ДГУ',
            xlabel='Время',
            ylabel='Коэффициент мощности',
        )
        await self.plot(
            req,
            pdf,
            tablename='DGU',
            parameter='fuel',
            rng=2,
            target=1,
            title='Уровень топлива',
            legend='ДГУ',
            xlabel='Время',
            ylabel='Уровень топлива',
        )

    async def plot_ibp(self, req, pdf):
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры ИБП', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename='IBP',
            parameter='voltage',
            rng=2,
            target=400,
            title='Напряжение',
            legend='ИБП',
            xlabel='Время',
            ylabel='Напряжение, В'
        )
        await self.plot(
            req,
            pdf,
            tablename='IBP',
            parameter='activePower',
            rng=2,
            target=700,
            title='Активная мощность',
            legend='ИБП',
            xlabel='Время',
            ylabel='Мощность, кВт',
        )
        await self.plot(
            req,
            pdf,
            tablename='IBP',
            parameter='coefficient',
            rng=2,
            target=1,
            title='Коэффициент мощности',
            legend='ИБП',
            xlabel='Время',
            ylabel='Коэффициент мощности',
        )
        await self.plot(
            req,
            pdf,
            tablename='IBP',
            parameter='charge',
            rng=2,
            target=1,
            title='Уровень заряда',
            legend='ИБП',
            xlabel='Время',
            ylabel='Уровень заряда',
        )
        await self.plot(
            req,
            pdf,
            tablename='IBP',
            parameter='load',
            rng=2,
            target=1,
            title='Нагрузка',
            legend='ИБП',
            xlabel='Время',
            ylabel='Нагрузка',
        )

    async def plot_schr(self, req, pdf):
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры ЩР', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename='SCHR',
            parameter='voltage',
            rng=2,
            target=400,
            title='Напряжение',
            legend='ЩР',
            xlabel='Время',
            ylabel='Напряжение, В'
        )
        await self.plot(
            req,
            pdf,
            tablename='SCHR',
            parameter='activePower',
            rng=8,
            target=700,
            title='Активная мощность',
            legend='ЩР',
            xlabel='Время',
            ylabel='Мощность, кВт',
        )
        await self.plot(
            req,
            pdf,
            tablename='SCHR',
            parameter='coefficient',
            rng=8,
            target=1,
            title='Коэффициент мощности',
            legend='ЩР',
            xlabel='Время',
            ylabel='Коэффициент мощности',
        )

    async def plot_pdu(self, req, pdf):
        tablename = 'PDU'
        title = 'PDU'
        rng = 64
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, f'Параметры {title}', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='voltage',
            rng=rng,
            target=230,
            title='Напряжение',
            legend=title,
            xlabel='Время',
            ylabel='Напряжение, В'
        )
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='current',
            rng=rng,
            target=16,
            title='Сила тока',
            legend=title,
            xlabel='Время',
            ylabel='Сила тока, А',
        )

    async def plot_hot(self, req, pdf):
        tablename = 'hot'
        title = 'Горячий коридор'
        rng = 4
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры горячих коридоров', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='temperature',
            rng=rng,
            target=30,
            title='Температура',
            legend=title,
            xlabel='Время',
            ylabel='Температура, °C'
        )
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='humidity',
            rng=rng,
            target=50,
            title='Влажность',
            legend=title,
            xlabel='Время',
            ylabel='Влажность'
        )

    async def plot_cold(self, req, pdf):
        tablename = 'cold'
        title = 'Стойка'
        rng = 32
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры холодных коридоров', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='temperature',
            rng=rng,
            target=22,
            title='Температура',
            legend=title,
            xlabel='Время',
            ylabel='Температура, °C'
        )
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='humidity',
            rng=rng,
            target=50,
            title='Влажность',
            legend=title,
            xlabel='Время',
            ylabel='Влажность'
        )

    async def plot_conditioner(self, req, pdf):
        tablename = 'conditioner'
        title = 'Кондиционер'
        rng = 2
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры кондиционеров', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='temperature',
            rng=rng,
            target=20,
            title='Выходная температура воздуха',
            legend=title,
            xlabel='Время',
            ylabel='Температура, °C'
        )

    async def plot_chiller(self, req, pdf):
        tablename = 'chiller'
        title = 'Чиллер'
        rng = 2
        plt.figure(figsize=(8, 6))
        plt.axis('off')
        plt.text(0.5, 0.5, 'Параметры чиллеров', ha='center', va='center', fontsize=24)
        pdf.savefig()
        plt.close()
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='temperatureIn',
            rng=rng,
            target=22,
            title='Температура на входе',
            legend=title,
            xlabel='Время',
            ylabel='Температура, °C'
        )
        await self.plot(
            req,
            pdf,
            tablename=tablename,
            parameter='temperatureOut',
            rng=rng,
            target=16,
            title='Температура на выходе',
            legend=title,
            xlabel='Время',
            ylabel='Температура, °C'
        )

    async def generate(self, req: GenerateRequest):
        ts = req.timefrom.strftime('%d-%m-%Y %H:%M:%S')
        te = req.timeto.strftime('%d-%m-%Y %H:%M:%S')
        object_name = f'отчет за {ts} — {te}.{str(uuid4())[:4]}.pdf'
        filename = object_name
        with PdfPages(filename) as pdf:
            # Первая страница с заголовком
            plt.figure(figsize=(8, 6))
            plt.axis('off')
            plt.text(0.5, 0.5, f'Отчет за\n{ts} — {te}', ha='center', va='center', fontsize=24)
            pdf.savefig()
            plt.close()

            await self.plot_grsch(req, pdf)
            await self.plot_dgu(req, pdf)
            await self.plot_ibp(req, pdf)
            await self.plot_schr(req, pdf)
            await self.plot_pdu(req, pdf)
            await self.plot_hot(req, pdf)
            await self.plot_cold(req, pdf)
            await self.plot_conditioner(req, pdf)
            await self.plot_chiller(req, pdf)

        self.report_repo.fadd(filename, object_name)
        try:
            os.remove(filename)
        except Exception:
            print("failed to remove file")

    async def fill_data(self, tablename, grouping, timefrom, timeto, target, size=46):
        to_fill = {i: [[], [], target[i - 1]] for i in range(1, size + 1)}
        for position in to_fill:
            result: list[FoundData] = (await self.data_repo.get_min_max_grouped(
                tablename,
                grouping,
                timefrom,
                timeto,
                position,
                target[position - 1]
            ))
            for record in result:
                to_fill[position][0].append(record.timestamp + timedelta(hours=3))
                to_fill[position][1].append(record.value)
        return to_fill

    def get(self, object_name):
        return self.report_repo.get(object_name)

    def list(self):
        res = self.report_repo.list()
        ans = []
        for obj in res:
            ans.append({
                'filename': obj.object_name,
                'size': obj.size,
                'creation_date': obj.last_modified,
            })
        return ans
