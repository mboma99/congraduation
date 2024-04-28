"""Add Access table

Revision ID: 31bd73e6b310
Revises: 2da614b58986
Create Date: 2024-04-28 15:50:03.342537

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '31bd73e6b310'
down_revision: Union[str, None] = '2da614b58986'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'tbl_access',
        sa.Column('id',sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),  # Adding created_at column
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('tbl_access')